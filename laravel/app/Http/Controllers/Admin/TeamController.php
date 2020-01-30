<?php

namespace App\Http\Controllers\Admin;

use App\AdminUser;
use App\Http\Resources\Admin\AdminUserResource;
use App\Salon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\Collection;

class TeamController
{
    /**
     * @param Request $id Salon id
     *
     * @return json list of salon members
     */
    public function getList()
    {
        $user = Auth::user();
        $salon = $user->salon;
        return AdminUserResource::collection($salon->adminUsers);
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        $salon = $user->salon;

        $newUser = new AdminUser();
        $newUser->first_name = $request->firstName;
        $newUser->last_name = $request->lastName;
        $newUser->active = true;
        $newUser->save();

        $salon->AdminUsers()->save($newUser);
        return [];
    }
}
