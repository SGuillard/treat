<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OpeningHour extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function salon()
    {
        return $this->belongsTo('App\Salon');
    }
}
