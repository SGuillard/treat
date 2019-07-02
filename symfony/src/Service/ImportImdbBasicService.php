<?php

namespace App\Service;

use App\Entity\Movie;
use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use App\Utils\MovieConst;

class ImportImdbBasicService
{
    public const IMDB_FILES_FOLDER = '/src/ImdbFiles/';
    private const BASIC_FILE = 'basics.tsv';
    private const TEMP_BASIC_FILE = 'temp.basics.tsv';
    private const TYPE = 'movie';
    private const IS_ADULT = '0';
    private const YEAR = 1800;

    private $em;
    private $imdbFolder;
    private $logger;

    public function __construct(KernelInterface $kernel, EntityManagerInterface $em, LoggerInterface $logger)
    {
        $this->imdbFolder = $kernel->getProjectDir() . self::IMDB_FILES_FOLDER;
        $this->em = $em;
        $this->logger = $logger;
    }

    /**
     *  Bunisess logic - Steps to execute
     *
     * @return string
     */
    public function import(): void
    {
        $this->checkFile();
        do {
            $row = $this->parseFile();
            if (!empty($row)) {
                $this->updateMovie($row);
            }
            $this->deleteFirstFileLine();
        } while (false !== $this->parseFile());
        return;
    }

    /**
     * Remove the temporary file if script has stopped before at this step
     *
     * @return void
     */
    private function checkFile(): void
    {
        if (!file_exists($this->imdbFolder . self::BASIC_FILE)) {
            rename($this->imdbFolder . self::TEMP_BASIC_FILE, $this->imdbFolder . self::BASIC_FILE);
            unlink($this->imdbFolder . self::TEMP_BASIC_FILE);
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
        $input = explode("\n", file_get_contents($this->imdbFolder . self::BASIC_FILE));
        $output = array_slice($input, 1);
        file_put_contents($this->imdbFolder . self::TEMP_BASIC_FILE, implode("\n", $output));
        unlink($this->imdbFolder . self::BASIC_FILE);
        rename($this->imdbFolder . self::TEMP_BASIC_FILE, $this->imdbFolder . self::BASIC_FILE);
        $this->parseFile();
        return;
    }

    /**
     * Parse the file through each line and persist movie
     *
     * @return mixed array | bool
     */
    private function parseFile()
    {

        if (false !== ($fp = fopen($this->imdbFolder . self::BASIC_FILE, "r"))) {
            $row = fgetcsv($fp, 0, "\t");
            if (false !== $row) {
                if ($this->checkValues($row)) {
                    return $row;
                }
                return [];
            }
            fclose($fp);
        }
        return false;
    }

    /**
     * Check if values are ok to persist the movie
     *
     * @param array $row
     * @return boolean
     */
    public function checkValues(array $row): bool
    {
        $rowDescription = $this->getRowDescripion($row);

        $type = $rowDescription[MovieConst::TYPE];
        $isAdult = $rowDescription[MovieConst::IS_ADULT];
        $year =  $rowDescription[MovieConst::YEAR];
        if ($type === self::TYPE && $isAdult === self::IS_ADULT && $year >= self::YEAR) {
            return true;
        }
        return false;
    }

    /**
     * Return more readable properties for each row
     *
     * @param array $row The tsv line to handle
     * @return array
     */
    private function getRowDescripion(array $row): array
    {
        return [
            MovieConst::UUID => $row[0],
            MovieConst::TYPE => $row[1],
            MovieConst::IS_ADULT => $row[4],
            MovieConst::YEAR => $row[5],
            MovieConst::GENRE => $row[6]
        ];
    }

    /**
     * Update movies in the database if ratings and votes are above arbitrary limit
     *
     * @param array $row
     * @return void 
     */
    private function updateMovie(array $row): void
    {
        $rowDescription = $this->getRowDescripion($row);
        $movieRepo = $this->em->getRepository(Movie::class);
        $movie = $movieRepo->findOneBy([MovieConst::UUID => $rowDescription[MovieConst::UUID]]);

        if (isset($movie)) {
            try {
                $movie->setType($rowDescription[MovieConst::TYPE]);
                $movie->setYear($rowDescription[MovieConst::YEAR]);
                $this->em->flush();
            } catch (UniqueConstraintViolationException $e) {
                $this->logger->error($e);
            }
        }
        return;
    }
}
