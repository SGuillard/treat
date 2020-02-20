<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\MainResource;

class AdminUserResource extends MainResource
{

    /**
     * Returns a general map of api names to db columns
     *
     * This does not contain ALL the api fields as some are
     * set in the toArray method because they need some
     * additional logic
     *
     * @var array
     */
    public static $map = [
        'firstName' => 'first_name',
        'lastName' => 'last_name',
    ];

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $result = $this->getMappedData();
        return $result;
    }
}
