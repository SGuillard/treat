<?php

namespace App\Http\Resources;

use App\Http\Controllers\PromotionController;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PromotionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => PromotionResource::collection($this->collection),
        ];
    }
}
