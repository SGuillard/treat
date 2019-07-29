<?php

namespace App\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ImportImdbFileService;

class ImportImdbFilesController extends AbstractController
{

    /**
     * @Route("/importFiles", name="importFiles")
     */
    public function ImportFiles(ImportImdbFileService $importFiles)
    {

        $import = $importFiles->importFiles();

        return $this->json([
            'message' => $import,
        ]);
    }
}
