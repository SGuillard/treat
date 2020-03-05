<?php

namespace App\Http\Controllers\Admin;

use App\AdminUser;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminUserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response as ResponseAlias;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    /**
     * Return the list of users for the salon of the actual authenticated user
     *
     * @return AnonymousResourceCollection
     */
    private function getAdminUserList()
    {
        return AdminUserResource::collection($this->getSalon()->adminUsers);
    }

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return $this->getAdminUserList();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function store(Request $request)
    {
        $newUser = AdminUser::create($request->input());
        $salon = $this->getSalon();
        $salon->AdminUsers()->save($newUser);
        return $this->getAdminUserList();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return ResponseAlias
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param AdminUser $adminUser
     * @return AnonymousResourceCollection
     */
    public function update(Request $request, AdminUser $adminUser)
    {
        $adminUser->update($request->input());
        return $this->getAdminUserList();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return ResponseAlias
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
