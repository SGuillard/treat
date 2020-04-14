<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\AdminUserResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Get salon for authenticated user
     *
     * @return string
     */
    protected function getSalon() {
        $user = Auth::user();
        return $user->salon;
    }

    /**
     * Return the list of users for the salon of the actual authenticated user
     *
     * @return AnonymousResourceCollection
     */
    protected function getAdminUserList()
    {
        return AdminUserResource::collection($this->getSalon()->adminUsers);
    }
}
