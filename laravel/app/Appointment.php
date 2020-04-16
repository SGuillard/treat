<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Get the user related to this appointment
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function service()
    {
        return $this->belongsTo('App\Service');
    }

    public function adminUser()
    {
        return $this->belongsTo('App\AdminUser');
    }

    public function salon()
    {
        return $this->belongsTo('App\Salon');
    }
}
