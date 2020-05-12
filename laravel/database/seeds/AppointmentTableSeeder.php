<?php

use App\AdminUser;
use App\Salon;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AppointmentTableSeeder extends Seeder
{
    private $count = 0;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->count = -240;
        factory('App\Appointment', 8)->create([
            'salon_id' => Salon::first(),
            'admin_user_id' => fn() => AdminUser::all()->random(1)->first(),
            'date' => function () {
                $this->count += 60;
                return Carbon::now()->addMinutes($this->count);
            },
        ]);
    }
}
