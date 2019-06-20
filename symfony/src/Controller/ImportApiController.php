<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use App\Entity\Movie;

class ImportApiController extends AbstractController
{

    public function __construct(KernelInterface $kernel)
    {
        $this->rootDir = $kernel->getProjectDir();
    }

    /**
     * @Route("/import", name="import")
     */
    public function index()
    {

        $session = new Session();
        $session->start();
        $session->get("rowNo") ?? 1;

        $importFolder = $this->rootDir . '/src/ImdbFiles/';

        $input = explode("\n", file_get_contents($importFolder . "ratings.1.tsv"));
        $output = array_slice($input, $session->get('rowNo'));
        file_put_contents($importFolder . "out.tsv", implode("\n", $output));
        unlink($importFolder . 'ratings.1.tsv');
        rename($importFolder . 'out.tsv', $importFolder . 'ratings.1.tsv');

        $entityManager = $this->getDoctrine()->getManager();
        $rowNo = 1;
        $session->set('rowNo', 1);
        if (($fp = fopen($importFolder . 'ratings.1.tsv', "r")) !== FALSE) {
            while (($row = fgetcsv($fp, 0, "\t")) !== FALSE) {
                $num = count($row);
                $rowNo++;
                $ratings = $row[1];
                $votes = $row[2];
                if ($votes > 1500 && $ratings >= 7.2) {
                    $movie = new Movie();
                    $movie->setUuid($row[0]);
                    $movie->setRatings($ratings);
                    $movie->setVotes($votes);
                    $entityManager->persist($movie);
                    $entityManager->flush();
                }
                $session->set('rowNo', $rowNo);
            }

            fclose($fp);
        } else {
            echo "Error parsing file";
            die;
        }


        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ImportApiController.php',
        ]);
    }
}
