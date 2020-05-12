<?php

use Illuminate\Database\Seeder;

class ServiceTableSeeder extends Seeder
{
    private $serviceNames = ['massage', 'hairCut', 'spa'];

    private function getServiceName()
    {
        $reverseNames = array_reverse($this->serviceNames);
        $name = array_pop($reverseNames);
        unset($this->serviceNames[array_key_first($this->serviceNames)]);
        return  $name;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory('App\Service', 3)->create([
           'name' => fn() => $this->getServiceName(),
        ]);
    }
}
