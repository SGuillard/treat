<?php

namespace App\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ImportImdbFileService;
use Symfony\Component\HttpFoundation\JsonResponse;

class ImportImdbFilesController extends AbstractController
{

    /**
     * @Route("/importFiles", name="importFiles")
     */
    public function ImportFiles(ImportImdbFileService $importFiles): JsonResponse
    {

        $import = $importFiles->importFiles();

        return $this->json([
            'message' => $import,
        ]);
    }
}
