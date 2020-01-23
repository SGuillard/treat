<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Login route - Unprotected from the 'auth:api' middleware to allow us to get a user token
Route::post('login', 'Auth\AuthenticationController@getToken');
Route::post('register', 'Auth\RegisterController@create');

// Prefix applied to all routes inside
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('team', 'TeamController@getTeam');
});
