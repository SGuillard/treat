<?php

use App\AdminUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Faker\Factory as Faker;

class AdminTableSeeder extends Seeder
{
    private $count = 0;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Faker::create();

        // Create a passport client to retrieve token
        Artisan::call(
            'passport:client',
            [
                '--redirect_uri' => 'localhost',
                '--name' => 'clientTest',
                '--user_id' => 10,
                '--personal' => true,
            ]
        );

        $salon = factory('App\Salon')->create();

        factory('App\User', 5)->create();

        factory('App\AdminUser', 4)->create([
            'salon_id' => $salon,
            'active' => function () {
                $this->count++;
                return $this->count % 2 === 0;
            }
        ]);
        // Our User test
        factory('App\AdminUser')->create([
            'email' => 'test',
            'password' => md5('test'),
            'salon_id' => $salon,
            'active' => 1,
        ]);

        factory('App\Appointment', 8)->create([
            'salon_id' => $salon,
            'admin_user_id' => function () {
                return AdminUser::all()->random(1)->first();
            },
        ]);

//        $firstService = new \App\Service();
//        $firstService->name = 'Hair Massage';
//        $firstService->duration = 45;
//        $firstService->price = 25.50;
//
//        $secondService = new \App\Service();
//        $secondService->name = 'Foot service';
//        $secondService->duration = 15;
//        $secondService->price = 15.25;
//
//        $salon->services()->saveMany([$firstService,$secondService]);
//
//        for ($i = 0; $i < 4; $i++) {
//            $appointment = new \App\Appointment();
//            $appointment->salon()->associate($salon);
//            $adminPerson = $i % 2 == 0 ? $superAdmin : $admin;
//            $appointment->client_name = $faker->name;
//            $appointment->user_id = $i % 2 == 0 ? null : 1;
//            $appointment->adminUser()->associate($adminPerson);
//            $appointment->date = $this->dateAddAnHour(now(), $i);
//            $appointment->service()->associate($firstService);
//            $appointment->duration = 15;
//            $appointment->save();
//        }
//
//        // Create business hours
//        $openingHourPerDay = [];
//        for($i = 0; $i <= 6; $i++) {
//            $openingHour = new \App\OpeningHour();
//            $openingHour->day = $i;
//            $openingHour->open = '08:30:00';
//            $openingHour->close = '18:30:00';
//            $openingHour->is_close = in_array($i, [6,7]);
//            $openingHour->save();
//            $openingHourPerDay[] = $openingHour;
//        }
//        $salon->services()->saveMany($openingHourPerDay);
    }

    private function dateAddAnHour($date = null, $howManyHours, $format = 'Y-m-d H:i:s')
    {
        $hoursToAdd = 11 + $howManyHours;
        $new_date = new \DateTime($date);
        $new_date->modify($hoursToAdd . ' hour');

        return $new_date->format($format);
    }
}
