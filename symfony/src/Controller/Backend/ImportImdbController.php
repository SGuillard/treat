<?php

namespace App\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ImportImdbRatingService;
use App\Service\ImportImdbBasicService;

class ImportImdbController extends AbstractController
{

    /**
     * @Route("/importFromRatings", name="importFromRatings")
     */
    public function importFromRatings(ImportImdbRatingService $importRating)
    {

        $import = $importRating->import();

        return $this->json([
            'message' => $import,
        ]);
    }

    /**
     * @Route("/importFromBasic", name="importFromBasic")
     */
    public function importFromBasics(ImportImdbBasicService $importBasics)
    {
        $import = $importBasics->import();
        return $this->json([
            'message' => $import,
        ]);
    }
}
