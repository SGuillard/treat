<?php

namespace App\Http\Controllers\Admin;

use App\AdminUser;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminUserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AdminUserResource::collection($this->getSalon()->adminUsers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newUser = new AdminUser();
        $newUser->first_name = $request->firstName;
        $newUser->last_name = $request->lastName;
        $newUser->active = true;
        $newUser->save();

        $salon = $this->getSalon();
        $salon->AdminUsers()->save($newUser);
        return AdminUserResource::collection($salon->adminUsers);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AdminUser $adminUser)
    {
        $adminUser->first_name = $request->firstName;
        $adminUser->last_name = $request->lastName;
        $adminUser->active = $request->active;
        $adminUser->save();

        return AdminUserResource::collection($this->getSalon()->adminUsers);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Get salon for authenticated user
     *
     * @return string
     */
    private function getSalon() {
        $user = Auth::user();
        return $user->salon;
    }
}
