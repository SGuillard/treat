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

// Admin login routes - Unprotected from the 'auth:api' middleware to allow us to get a user token
Route::post('login', 'Admin\Auth\AuthenticationController@getToken')->name('login');
Route::post('register', 'Admin\Auth\RegistrationController@store');

// Prefix applied to all routes inside
Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('services', 'Admin\ServiceController');
    Route::apiResource('adminUser', 'Admin\AdminUserController');
    Route::apiResource('appointments', 'AppointmentController');
    Route::apiResource('openingHours', 'OpeningHourController');
    Route::apiResource('promotions', 'PromotionController');
    Route::apiResource('salons', 'SalonController');
    Route::get('userSalon', 'SalonController@getUserSalon');
});
