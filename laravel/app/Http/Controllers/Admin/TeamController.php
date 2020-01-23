<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminUserResource;
use App\Salon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamController
{
    /**
     * @param Request $id Salon id
     *
     * Return the list of salon members
     */
    public function getTeam()
    {
        $user = Auth::user();
        $salon = $user->salon;
        return AdminUserResource::collection($salon->adminUsers);
    }
}
