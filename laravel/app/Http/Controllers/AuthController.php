<?php

namespace App\Http\Controllers;

use App\AdminUser;
use App\Models\User\User;
use Ezyvet\Framework\Classes\Encryption;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AuthenticationController
 *
 * @category App\Http
 * @package  Controllers
 *
 * @author   Sylvain Guillard
 * @since    19 November 2019
 */
class AuthenticationController
{

    /**
     * Retrieve bearer token if user credentials are corrects
     *
     * @param Request $request
     *
     * @return JsonResponse|Response
     */
    public function getToken(Request $request)
    {
        $user = AdminUser::where('email', $request->username)->first();

        if (!\is_null($user)) {
            $passwordMatch = md5($request->password, $user->password);
            if ($passwordMatch) {
                return $user->createToken('Admin');
            }
        }

        return response()->json(['message' => 'Unauthenticated.'], 401);
    }
}
