<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Salon;
use App\Service;
use Faker\Generator as Faker;

$factory->define(Service::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'price' => rand(50, 500) / 10,
        'duration' => rand(15, 180),
        'salon_id' => Salon::first(),
    ];
});
