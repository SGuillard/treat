<?php

use Illuminate\Database\Seeder;

class OpeningHourSeeder extends Seeder
{
    private $count = 0;

    /**
     * Simulate week days iteration
     * @return int
     */
    private function getDay()
    {
        $day = $this->count;
        $this->count++;
        return $day;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory('App\OpeningHour', 7)->create([
           'day' => fn() => $this->getDay()
        ]);
    }
}
