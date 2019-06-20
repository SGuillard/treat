<?php

namespace App\Entity;

use App\Entity\Traits\CreatedUpdatedTrait as DateMarker;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MovieRepository")
 */
class Movie
{

    use DateMarker;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="decimal", precision=2, scale=1, nullable=true)
     */
    private $ratings;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $votes;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $uuid;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getRatings()
    {
        return $this->ratings;
    }

    public function setRatings($ratings): self
    {
        $this->ratings = $ratings;

        return $this;
    }

    public function getVotes(): ?int
    {
        return $this->votes;
    }

    public function setVotes(?int $votes): self
    {
        $this->votes = $votes;

        return $this;
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(?string $uuid): self
    {
        $this->uuid = $uuid;

        return $this;
    }
}
