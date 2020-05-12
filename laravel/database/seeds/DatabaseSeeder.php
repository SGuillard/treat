<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

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

        factory('App\Salon')->create([
            'name' => 'My Salon'
        ]);
        $this->call(AdminUserTableSeeder::class);
        $this->call(ServiceTableSeeder::class);
        $this->call(AdminUserTableSeeder::class);
        $this->call(AppointmentTableSeeder::class);
        factory('App\User', 5)->create();


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
}
