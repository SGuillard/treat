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
        $this->hasMany('App\Appointment');
    }

    public function salon()
    {
        $this->belongsTo('App\Salon');
    }
}
