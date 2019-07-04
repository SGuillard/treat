<?php

namespace App\Service;

use App\Utils\ImportRatingFile;
use App\Utils\ImportBasicFile;

class ImportImdbFileService
{

    private $importRatingFile;
    private $importBasicFile;

    public function __construct(ImportRatingFile $importRatingFile, ImportBasicFile $importBasicFile)
    {
        $this->importRatingFile = $importRatingFile;
        $this->importBasicFile = $importBasicFile;
    }

    public function importFiles(): string
    {
        if ($this->importRatingFile->import()) {
            if ($this->importBasicFile->import()) {
                return 'ok';
            };
        };
        return 'no';
    }
}
