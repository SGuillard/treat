<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AdminUser;
use App\Salon;
use Faker\Generator as Faker;

$factory->define(AdminUser::class, function (Faker $faker) {
    return [
        'salon_id' => factory(Salon::class),
        'email' => $faker->email,
        'password' => $faker->password,
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'phone' => $faker->phoneNumber,
        'active' => $faker->boolean,
    ];
});
