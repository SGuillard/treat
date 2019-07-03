<?php

namespace App\Utils;

use App\Utils\PersistRating;
use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Service\ImportImdbFile;
use App\Service\ImportImdbInterface;

class ImportRatingFile extends ImportImdbFile implements ImportImdbInterface
{
    protected const FILE = 'ratings.tsv';

    public function __construct(PersistRating $fileToPersist, KernelInterface $kernel, EntityManagerInterface $em, LoggerInterface $logger)
    {
        parent::__construct($fileToPersist, $kernel, $em, $logger, self::FILE);
    }
}
