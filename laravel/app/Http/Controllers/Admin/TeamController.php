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
        return AdminUserResource::collection($salon->adminUsers);
    }

    public function status(Request $request)
    {
        $user = AdminUser::findOrFail($request->adminUserId);
        $user->active = $user->active == 1 ? 0 : 1;
        $user->save();
        return [];
    }
}
