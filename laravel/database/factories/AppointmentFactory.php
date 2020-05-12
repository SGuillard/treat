<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AdminUser;
use App\Appointment;
use App\Helpers\FactoryHelper;
use App\Salon;
use App\Service;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Appointment::class, function (Faker $faker) {
    return [
        'salon_id' => FactoryHelper::getSalon(),
        'admin_user_id' => FactoryHelper::getAdminUser(),
        'duration' => 15,
        'date' => Carbon::now(),
        'service_id' => FactoryHelper::getService(),
        'client_name' => $faker->name,
    ];
});
