<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Salon;
use Faker\Generator as Faker;

$factory->define(Salon::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
