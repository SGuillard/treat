<?php

namespace App\Utils;

use App\Utils\ImportImdbFile;
use Symfony\Component\HttpKernel\KernelInterface;
use Psr\Log\LoggerInterface;
use App\Utils\PersistRating;
use App\Utils\PersistBasic;
use Doctrine\ORM\EntityManagerInterface;

class ImportFileFactory
{
    private $kernel;
    private $logger;
    private $em;

    public function __construct(KernelInterface $kernel, LoggerInterface $logger, EntityManagerInterface $em)
    {
        $this->kernel = $kernel;
        $this->logger = $logger;
        $this->em = $em;
    }

    public function create(string $type): object
    {
        switch ($type) {
            case ImportImdbConst::getImportRatingClass():
                return new ImportImdbFile(new PersistRating($this->em), $this->kernel, $this->logger, ImportImdbConst::getRatingFile());
            case ImportImdbConst::getImportBasicClass():
                return new ImportImdbFile(new PersistBasic($this->em), $this->kernel, $this->logger, ImportImdbConst::getBasicFile());
        }
    }
}
