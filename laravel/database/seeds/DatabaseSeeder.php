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
        $this->call([
            AdminUserTableSeeder::class,
            ServiceTableSeeder::class,
            AdminUserTableSeeder::class,
            AppointmentTableSeeder::class,
            OpeningHourSeeder::class,
            PromotionSeeder::class,
        ]);
        factory('App\User', 5)->create();
    }
}
