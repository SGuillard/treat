<?php

namespace App\Http\Controllers;

use App\Salon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    /**
     * @param Request $id Salon id
     *
     * Return the list of salon members
     */
    public function getTeam()
    {
        $user = Auth::user();
        var_dump($user); die;
    }
}
