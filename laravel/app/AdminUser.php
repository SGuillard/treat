<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class AdminUser extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

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
