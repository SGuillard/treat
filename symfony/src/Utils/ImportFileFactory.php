<?php

namespace App\Utils;

use App\Service\ImportImdbFile;
use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class ImportFileFactory
{
    private $em;
    private $kernel;
    private $logger;

    public function __construct(EntityManagerInterface $em, KernelInterface $kernel, LoggerInterface $logger)
    {
        $this->em = $em;
        $this->kernel = $kernel;
        $this->logger = $logger;
    }

    public function create($type): object
    {
        switch ($type) {
            case self::RATING_CLASS:
                return new ImportImdbFile(new ${}($this->em), $this->kernel, $this->logger, self::RATING_FILE);
        }
    }
}
