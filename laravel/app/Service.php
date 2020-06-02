<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
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

    public function promotions(): HasMany
    {
        return $this->hasMany('App\Promotion');
    }
}
