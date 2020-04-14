<?php

namespace App\Http\Controllers\Admin\Auth;

use App\AdminUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Http\Resources\Admin\AdminUserResource;

class RegistrationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return AdminUserResource
     */
    public function store(RegistrationRequest $request)
    {
        $adminUser = new AdminUser();
        $adminUser->first_name = $request->firstName;
        $adminUser->last_name = $request->lastName;
        $adminUser->phone = $request->phone;
        $adminUser->email = $request->email;
        $adminUser->active = true;
        $adminUser->password = md5($request->password);
        $adminUser->save();

        $salon = new \App\Salon();
        $salon->name = $request->salon;
        $salon->save();

        $salon->adminUsers()->save($adminUser);

        return new AdminUserResource($adminUser);;
    }
}
