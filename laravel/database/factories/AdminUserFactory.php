<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AdminUser;
use Faker\Generator as Faker;

$factory->define(AdminUser::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
