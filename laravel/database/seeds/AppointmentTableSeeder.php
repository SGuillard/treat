<?php

use App\AdminUser;
use App\Salon;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AppointmentTableSeeder extends Seeder
{
    private $count = 0;

    public function getOrCreateRandomAdminUser()
    {
        $adminUser = AdminUser::all();
        return $adminUser->isNotEmpty() ? $adminUser->random(1)->first() : factory('App\AdminUser')->create();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->count = -240;
        factory('App\Appointment', 8)->create([
            'admin_user_id' => fn() => $this->getOrCreateRandomAdminUser(),
            'date' => function () {
                $this->count += 60;
                return Carbon::now()->addMinutes($this->count);
            },
        ]);
    }
}
