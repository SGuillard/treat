<?php

use Illuminate\Database\Seeder;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $salon = new \App\Salon();
        $salon->name = 'SalonTest';
        $salon->save();

        factory('App\User', 5)->create();

        $superAdmin = new \App\AdminUser();
        $superAdmin->name = 'SuperAdmin';

        $admin = new \App\AdminUser();
        $admin->name = 'NormalAdmin';

        $salon->adminUsers()->saveMany([$superAdmin, $admin]);

        for($i = 0; $i < 4; $i++) {
            $appointment = new \App\Appointment();
            $appointment->name = 'test Appointment '.$i;
            $appointment->salon()->associate($salon);
            $adminPerson = $i % 2 == 0 ? $superAdmin : $admin;
            $appointment->adminUser()->associate($adminPerson);
            $appointment->start_date = $this->dateAddAnHour(now(), $i);
            $appointment->end_date = $this->dateAddAnHour(now(), $i + 1);;
            $appointment->save();
        }
    }

    private function dateAddAnHour($date = null, $howManyHours = '+1', $format = 'Y-m-d H:i:s')
    {
        $new_date = new \DateTime($date);
        $new_date->modify($howManyHours.' hour');

        return $new_date->format($format);
    }
}
