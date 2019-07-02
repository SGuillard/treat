<?php

namespace App\Service;

use App\Entity\Movie;
use Symfony\Component\HttpKernel\KernelInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Utils\MovieConst;
use Doctrine\DBAL\DBALException;

class ImportImdbRatingService
{
    public const IMDB_FILES_FOLDER = '/src/ImdbFiles/';
    private const RATING_FILE = 'ratings.tsv';
    private const TEMP_RATING_FILE = 'temp.rating.tsv';
    private const VOTE_LIMIT = 5;
    private const RATE_LIMIT = 5;

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
                $this->persistMovie($row);
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
        if (!file_exists($this->imdbFolder . self::RATING_FILE)) {
            rename($this->imdbFolder . self::TEMP_RATING_FILE, $this->imdbFolder . self::RATING_FILE);
            unlink($this->imdbFolder . self::TEMP_RATING_FILE);
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
        $input = explode("\n", file_get_contents($this->imdbFolder . self::RATING_FILE));
        $output = array_slice($input, 1);
        file_put_contents($this->imdbFolder . self::TEMP_RATING_FILE, implode("\n", $output));
        unlink($this->imdbFolder . self::RATING_FILE);
        rename($this->imdbFolder . self::TEMP_RATING_FILE, $this->imdbFolder . self::RATING_FILE);
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
        if (false !== ($fp = fopen($this->imdbFolder . self::RATING_FILE, "r"))) {
            $row = fgetcsv($fp, 0, "\t");
            if (false !== $row) {
                $rowDescription = $this->getRowDescripion($row);
                $vote = $rowDescription[MovieConst::VOTES];
                $rating = $rowDescription[MovieConst::RATINGS];
                if ($this->checkValues($vote, $rating)) {
                    if ($vote >= self::VOTE_LIMIT && $rating >= self::RATE_LIMIT) {
                        return $row;
                    }
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
     * @param [unknown] ...$values
     * @return boolean
     */
    public function checkValues(...$values)
    {
        foreach ($values as $value) {
            if (!is_numeric($value)) {
                return false;
            }
        }
        return true;
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
            MovieConst::RATINGS => $row[1],
            MovieConst::VOTES => $row[2]
        ];
    }

    /**
     * Persist movies in the database if ratings and votes are above arbitrary limit
     *
     * @param array $row
     * @return void
     */
    private function persistMovie(array $row): void
    {
        $rowDescription = $this->getRowDescripion($row);
        $repository = $this->em->getRepository(Movie::class);
        $findMovieByUuid = $repository->findOneBy(['uuid' => $rowDescription[MovieConst::UUID]]);
        if (!isset($findMovieByUuid)) {
            try {
                $movie = new Movie();
                $movie->setUuid($rowDescription[MovieConst::UUID]);
                $movie->setRatings($rowDescription[MovieConst::RATINGS]);
                $movie->setVotes($rowDescription[MovieConst::VOTES]);
                $this->em->persist($movie);
                $this->em->flush();
            } catch (DBALException $e) {
                $this->logger->error($e);
            }
        }
        return;
    }
}
