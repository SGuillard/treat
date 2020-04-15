<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Create a personal
        Artisan::call(
            'passport:client',
            [
                '--redirect_uri' => 'localhost',
                '--name' => 'clientTest',
                '--user_id' => 10,
                '--personal' => true,
            ]
        );

        $salon = new \App\Salon();
        $salon->name = 'SalonTest';
        $salon->save();

        factory('App\User', 5)->create();

        $superAdmin = new \App\AdminUser();
        $superAdmin->first_name = 'Admin';
        $superAdmin->last_name = 'Super';
        $superAdmin->email = 'test';
        $superAdmin->phone = 25764587;
        $superAdmin->password = md5('test');
        $superAdmin->active = true;

        $admin = new \App\AdminUser();
        $admin->first_name = 'Admin';
        $admin->last_name = 'Normal';
        $admin->email = 'test1';
        $admin->phone = 25768989;
        $admin->password = md5('test1');
        $admin->active = true;

        $adminOther = new \App\AdminUser();
        $adminOther->first_name = 'Admin';
        $adminOther->last_name = 'Other';
        $adminOther->email = 'test2';
        $adminOther->phone = 1111111;
        $adminOther->password = md5('test2');
        $adminOther->active = false;

        $salon->adminUsers()->saveMany([$superAdmin, $admin, $adminOther]);

        $firstService = new \App\Service();
        $firstService->name = 'Hair Massage';
        $firstService->duration = 45;
        $firstService->price = 25.50;

        $secondService = new \App\Service();
        $secondService->name = 'Foot service';
        $secondService->duration = 15;
        $secondService->price = 15.25;

        $salon->services()->saveMany([$firstService,$secondService]);

        for ($i = 0; $i < 4; $i++) {
            $appointment = new \App\Appointment();
            $appointment->salon()->associate($salon);
            $adminPerson = $i % 2 == 0 ? $superAdmin : $admin;
            $appointment->adminUser()->associate($adminPerson);
            $appointment->date = $this->dateAddAnHour(now(), $i);
            $appointment->service()->associate($firstService);
            $appointment->duration = 15;
            $appointment->save();
        }
    }

    private function dateAddAnHour($date = null, $howManyHours = '+1', $format = 'Y-m-d H:i:s')
    {
        $new_date = new \DateTime($date);
        $new_date->modify($howManyHours . ' hour');

        return $new_date->format($format);
    }
}
