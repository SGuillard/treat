<?php

/** @var Factory $factory */

use App\Helpers\FactoryHelper;
use App\OpeningHour;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(OpeningHour::class, function (Faker $faker) {
    return [
        'salon_id' => FactoryHelper::getSalon(),
        'day' => rand(0, 6),
        'open' => '08:30:00',
        'close' => '18:30:00',
        'is_close' => $faker->boolean,
    ];
});
