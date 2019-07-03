<?php

namespace App\Service;

use App\Utils\ImportRatingFile;

class ImportImdbFilesService
{

    private $importRatingFile;

    public function __construct(ImportRatingFile $importRatingFile)
    {
        $this->importRatingFile = $importRatingFile;
    }

    public function importFiles(): string
    {
        return $this->importRatingFile->import();
    }
}
