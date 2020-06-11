<?php

namespace App\Http\Resources;

use App\Http\Resources\Admin\ServiceResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PromotionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request, $recursively = false)
    {
        return [
            'id' => $this->id,
            'is_active' => (boolean) $this->day,
            'name' => $this->name,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'day' => $this->day,
            'start_hour' => $this->start_hour,
            'end_hour' => $this->end_hour,
            'discount' => $this->discount,
            'service' => new ServiceResource($this->service),
        ];
    }
}
