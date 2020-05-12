<?php

use App\AdminUser;
use Carbon\Carbon;

class AppointmentTableSeeder extends MainSeeder
{
    private int $countMinute = -240;
    private int $count = 0;

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
        factory('App\Appointment', 8)->create([
            'admin_user_id' => fn() => $this->getOrCreateRandomAdminUser(),
            'date' => function () {
                $this->countMinute += 60;
                return Carbon::now()->addMinutes($this->countMinute);
            },
            'client_name' => function () {
                $this->count++;
                return $this->count % 2 === 0 ? '' : $this->getFaker()->name;
            }
        ]);
    }
}
