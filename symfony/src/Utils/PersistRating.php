<?php

namespace App\Utils;

use App\Utils\PersistMovieInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Movie;

class PersistRating implements PersistMovieInterface
{
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    protected $row;

    private const VOTE_LIMIT = 5;
    private const RATE_LIMIT = 5;

    public function setRow(array $row)
    {
        $this->row = $row;
    }

    /**
     * Check if values are ok to persist the movie
     *
     * @param array $row
     * @return array
     */
    public function handleMoviePersistance(array $row): void
    {
        $this->setRow($row);
        if ($this->checkValues()) {
            $this->persistMovie();
        }
        return;
    }

    public function checkValues(): bool
    {
        $rowDescription = $this->getRowDescription();
        $vote = $rowDescription[MovieConst::VOTES];
        $rating = $rowDescription[MovieConst::RATINGS];
        foreach ([$vote, $rating] as $value) {
            if (!is_numeric($value)) {
                return false;
            }
        }
        if ($vote >= self::VOTE_LIMIT && $rating >= self::RATE_LIMIT) {
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
    public function getRowDescription(): array
    {
        return [
            MovieConst::UUID => $this->row[0],
            MovieConst::RATINGS => $this->row[1],
            MovieConst::VOTES => $this->row[2]
        ];
    }

    /**
     * Persist movies in the database if ratings and votes are above arbitrary limit
     *
     * @param array $row
     * @return void
     */
    public function persistMovie(): void
    {
        $rowDescription = $this->getRowDescription();
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
