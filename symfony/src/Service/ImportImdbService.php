<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Session\Session;
use App\Entity\Movie;
use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use App\Utils\MovieConst;

class ImportImdbService
{
    public const IMDB_FILES_FOLDER = '/src/ImdbFiles/';
    private const ROW_NUMBER = 'RowNumber';
    private const RATING_FILE = 'ratings.1.tsv';
    private const TEMP_RATING_FILE = 'temp.rating.tsv';

    private $em;
    private $imdbFolder;
    private $session;
    private $logger;

    public function __construct(KernelInterface $kernel, EntityManagerInterface $em, LoggerInterface $logger)
    {
        $this->rootDir = $kernel->getProjectDir();
        $this->imdbFolder = $this->rootDir . self::IMDB_FILES_FOLDER;
        $this->em = $em;
        $this->logger = $logger;
        $this->session = new Session();
    }

    /**
     *  Bunisess logic - Steps to execute
     *
     * @return string
     */
    public function importFromRating(): string
    {
        $this->initializeSession();
        $this->deleteFileLines();
        return $this->parseFile();
    }

    /**
     * Initialize session
     *
     * @return void
     */
    private function initializeSession(): void
    {
        $this->session->start();
        $this->session->set(self::ROW_NUMBER, 1);
        $this->session->get(self::ROW_NUMBER) ?? 1;
        return;
    }

    /**
     * Delete lines in the file that has already been parsed in a previous execution
     *
     * @return void
     */
    private function deleteFileLines(): void
    {
        $input = explode("\n", file_get_contents($this->imdbFolder . self::RATING_FILE));
        $output = array_slice($input, $this->session->get(self::ROW_NUMBER));
        file_put_contents($this->imdbFolder . self::TEMP_RATING_FILE, implode("\n", $output));
        unlink($this->imdbFolder . self::RATING_FILE);
        rename($this->imdbFolder . self::TEMP_RATING_FILE, $this->imdbFolder . self::RATING_FILE);
        return;
    }

    /**
     * Parse the file through each line and persist movie
     *
     * @return string
     */
    private function parseFile(): string
    {
        $rowNo = 1;
        $this->session->set(self::ROW_NUMBER, 1);
        if (($fp = fopen($this->imdbFolder . self::RATING_FILE, "r")) !== FALSE) {
            while (($row = fgetcsv($fp, 0, "\t")) !== FALSE) {
                $rowNo++;
                $this->persistMovie($row);
                $this->session->set(self::ROW_NUMBER, $rowNo);
            }
            fclose($fp);
            $message = "Success import";
        } else {
            $message = "Error parsing file";
        }
        return $message;
    }

    /**
     * Return more readable properties for each row
     *
     * @param array $row
     * @return array
     */
    private function getRowDescripion(array $row): array
    {
        return [
            MovieConst::UUID => $row[0],
            MovieConst::RATINGS => $row[1],
            MovieConst::VOTES => $row[2]
        ];
    }

    /**
     * Persist movies in the database if ratings and votes are above arbitrary limit
     *
     * @param array $row
     * @return void
     */
    private function persistMovie(array $row): void 
    {
        $rowDescription = $this->getRowDescripion($row);
        if ($rowDescription[MovieConst::VOTES] > 1500 && $rowDescription[MovieConst::RATINGS] >= 7.2) {
            try{
                $movie = new Movie();
                $movie->setUuid($rowDescription[MovieConst::UUID]);
                $movie->setRatings($rowDescription[MovieConst::RATINGS]);
                $movie->setVotes($rowDescription[MovieConst::VOTES]);
                $this->em->persist($movie);
                $this->em->flush();
            }catch(UniqueConstraintViolationException $e){
                $this->logger->error($e);
            }
        }
        return;
    }
}
