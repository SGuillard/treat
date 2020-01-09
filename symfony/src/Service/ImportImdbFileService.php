<?php

namespace App\Service;

use App\Utils\ImportFileFactory;
use App\Utils\ImportImdbConst;

class ImportImdbFileService
{
    public $fileFactory;

    public function __construct(ImportFileFactory $fileFactory)
    {
        $this->fileFactory = $fileFactory;
    }

    public function importFiles(): string
    {
        $importRatingFile = $this->fileFactory->create(ImportImdbConst::RATING_CLASS);
        $importBasicFile = $this->fileFactory->create(ImportImdbConst::BASIC_CLASS);

        if ($importRatingFile->import()) {
            if ($importBasicFile->import()) {
                return 'ok';
            };
        };
        return 'no';
    }
}
