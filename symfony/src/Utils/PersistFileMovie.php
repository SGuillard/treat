<?php

namespace App\Utils;

use Doctrine\ORM\EntityManagerInterface;

abstract class PersistFileMovie
{
    protected $em;
    protected $row;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

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
}
