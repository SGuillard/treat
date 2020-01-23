<?php

namespace App\Http\Controllers\Admin\Auth;

use App\AdminUser;
use Illuminate\Http\Request;

class RegisterController
{

    public function create(Request $request) {

        $adminUser = new AdminUser();
        $adminUser->first_name = $request->firstName;
        $adminUser->last_name = $request->lastName;
        $adminUser->phone = $request->phone;
        $adminUser->email = $request->email;
        $adminUser->password = md5($request->password);
        $adminUser->save();

        $salon = new \App\Salon();
        $salon->name = $request->salon;
        $salon->save();

        $salon->adminUsers()->save($adminUser);

        return [];
    }

}
