<?php

namespace App\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ImportImdbFilesService;

class ImportImdbFilesController extends AbstractController
{

    /**
     * @Route("/importFiles", name="importFiles")
     */
    public function ImportFiles(ImportImdbFilesService $importFiles)
    {

        $import = $importFiles->importFiles();

        return $this->json([
            'message' => $import,
        ]);
    }

    // /**
    //  * @Route("/importFromBasic", name="importFromBasic")
    //  */
    // public function importFromBasics(ImportImdbBasicService $importBasics)
    // {
    //     $import = $importBasics->import();
    //     return $this->json([
    //         'message' => $import,
    //     ]);
    // }
}
