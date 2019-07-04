<?php

namespace App\Utils;

use App\Utils\PersistBasic;
use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Service\ImportImdbFile;
use App\Service\ImportImdbInterface;

class ImportBasicFile extends ImportImdbFile implements ImportImdbInterface
{
    protected const FILE = 'basics.tsv';

    public function __construct(PersistBasic $fileToPersist, KernelInterface $kernel, EntityManagerInterface $em, LoggerInterface $logger)
    {
        parent::__construct($fileToPersist, $kernel, $em, $logger, self::FILE);
    }
}
