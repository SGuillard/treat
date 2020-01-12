<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminUser extends Model
{
    /**
     * Retrieve the appointments of the admin user
     */
    public function appointments()
    {
       return $this->hasMany('App\Appointment');
    }

    public function salon()
    {
       return $this->belongsTo('App\Salon');
    }
}
