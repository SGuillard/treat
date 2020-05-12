<?php

use App\Salon;
use Illuminate\Database\Seeder;

class AdminUserTableSeeder extends Seeder
{

    private $count = 0;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory('App\AdminUser', 4)->create([
            'salon_id' => Salon::first(),
            'active' => function () {
                $this->count++;
                return $this->count % 2 === 0;
            }
        ]);

        // Our User test
        factory('App\AdminUser')->create([
            'email' => 'test',
            'password' => md5('test'),
            'salon_id' => Salon::first(),
            'active' => 1,
        ]);
    }
}
