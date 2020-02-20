<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class MainResource
 *
 * @package App\Http\Resources
 */
class MainResource extends JsonResource
{
    /**
     * Returns a general map of api names to db columns.
     * This does not contain ALL the api fields as some are
     * set in the toArray method because they need some
     * additional logic
     *
     * @var array
     */
    public static $map = [];

    /**
     * Transform the map into the data array
     *
     * @return array
     */
    protected function getMappedData(): array
    {
        $result = [];
        foreach ($this::$map as $front => $back) {
            $result[$front] = $this->{$back};
        }
        $result['id'] = $this->id;
        return $result;
    }
}
