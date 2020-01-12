<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    public function adminUser()
    {
        $this->hasMany('App\AdminUser');
    }
}
