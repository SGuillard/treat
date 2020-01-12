<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $salon = new \App\Salon();
        $salon->name= 'SalonTest';
        $salon->save();

        factory('App\User', 5)->create();

        $superAdmin = new \App\AdminUser();
        $superAdmin->name = 'SuperAdmin';

        $admin = new \App\AdminUser();
        $admin->name = 'NormalAdmin';

        $salon->adminUsers()->saveMany([$superAdmin, $admin]);

    }
}
