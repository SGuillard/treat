<?php

namespace App\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ImportImdbService;

class ImportImdbController extends AbstractController
{

    /**
     * @Route("/importFromRatings", name="importFromRatings")
     */
    public function importFromRatings(ImportImdbService $importService)
    {

        $import = $importService->importFromRating();

        return $this->json([
            'message' => $import,
        ]);
    }
}
