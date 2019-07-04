<?php

namespace App\Service;

use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Utils\PersistMovieInterface;
use App\Service\ImportImdbInterface;

class  ImportImdbFile
{

    public const IMDB_FILES_FOLDER = '/src/ImdbFiles/';
    protected const TEMP_FILE = 'temp.tsv';

    protected $imdbFolder;
    protected $logger;
    protected $file;

    public function __construct(PersistMovieInterface $fileToPersist, KernelInterface $kernel, LoggerInterface $logger, string $file)
    {
        $this->imdbFolder = $kernel->getProjectDir() . self::IMDB_FILES_FOLDER;
        $this->logger = $logger;
        $this->fileToPersist = $fileToPersist;
        $this->file = $file;
    }

    /**
     *  Bunisess logic - Steps to execute
     *
     * @return string
     */
    public function import(): bool
    {
        $this->checkFile();
        do {
            $row = $this->parseFile();
            if (!empty($row)) {
                $this->fileToPersist->handleMoviePersistance($row);
                $this->deleteFirstFileLine();
            }
        } while (false !== $this->parseFile());
        return true;
    }

    /**
     * Remove the temporary file if script has stopped before at this step
     *
     * @return void
     */
    private function checkFile(): void
    {
        if (!file_exists($this->imdbFolder . $this->file)) {
            rename($this->imdbFolder . self::TEMP_FILE, $this->imdbFolder . $this->file);
            unlink($this->imdbFolder . self::TEMP_FILE);
        }
        return;
    }


    /**
     * Delete first line of the file
     *
     * @return void
     */
    private function deleteFirstFileLine(): void
    {
        $input = explode("\n", file_get_contents($this->imdbFolder . $this->file));
        $output = array_slice($input, 1);
        file_put_contents($this->imdbFolder . self::TEMP_FILE, implode("\n", $output));
        unlink($this->imdbFolder . $this->file);
        rename($this->imdbFolder . self::TEMP_FILE, $this->imdbFolder . $this->file);
        $this->parseFile();
        return;
    }


    /**
     * Parse the file through each line and check values
     *
     * @return mixed array | bool
     */
    private function parseFile()
    {
        if (false !== ($fp = fopen($this->imdbFolder . $this->file, "r"))) {
            $row = fgetcsv($fp, 0, "\t");
            if (false !== $row) {
                return $row;
            }
        }
        fclose($fp);
        return false;
    }
}
