<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function adminUsers()
    {
        return $this->hasMany('App\AdminUser');
    }

    public function services()
    {
        return $this->hasMany('App\Service');
    }

    public function appointments()
    {
        return $this->hasMany('App\Appointment');
    }
}
