<?php

namespace App\Utils;

use App\Utils\PersistMovieInterface;
use App\Entity\Movie;
use App\Utils\PersistFileMovie;

class PersistBasic extends PersistFileMovie implements PersistMovieInterface
{

    private const TYPE = 'movie';
    private const IS_ADULT = '0';
    private const YEAR = 1800;

    public function checkValues(): bool
    {
        $rowDescription = $this->getRowDescripion($this->row);

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
    private function getRowDescripion(): array
    {
        return [
            MovieConst::UUID => $this->row[0],
            MovieConst::TYPE => $this->row[1],
            MovieConst::IS_ADULT => $this->row[4],
            MovieConst::YEAR => $this->row[5],
            MovieConst::GENRE => $this->row[6]
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
        $rowDescription = $this->getRowDescripion($this->row);
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
