<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Helpers\FactoryHelper;
use App\Promotion;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Promotion::class, function (Faker $faker) {
    $now = Carbon::now();
    $dayOptions = [null, 1, 2];

    return array(
        'is_active' => $faker->boolean,
        'name' => $faker->name,
        'start_date' => $now,
        'end_date' => $now->add(3, 'day'),
        'day' => $dayOptions[array_rand($dayOptions)],
        'start_hour' => $now->format('h:i:s'),
        'end_hour' => $now->addHour()->format('h:i:s'),
        'discount' => rand(10, 30),
        'service_id' => FactoryHelper::getService(),
    );
});
