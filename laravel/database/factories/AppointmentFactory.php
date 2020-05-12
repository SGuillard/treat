<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AdminUser;
use App\Appointment;
use App\Salon;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Appointment::class, function (Faker $faker) {
    return [
        'salon_id' => Salon::first(),
        'admin_user_id' => AdminUser::first(),
        'duration' => 15,
        'date' => Carbon::now()->addHour(),
//        'first_name' => $faker->firstName,
//        'last_name' => $faker->lastName,
//        'phone' => $faker->phoneNumber,
//        'active' => $faker->boolean,
    ];
});
