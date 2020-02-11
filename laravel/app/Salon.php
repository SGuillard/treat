<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
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
