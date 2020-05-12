<?php

use Illuminate\Database\Seeder;

/**
 * Class MainSeeder
 */
abstract class MainSeeder extends Seeder
{
    /**
     * Helper to instantiate Faker
     * @return \Faker\Generator
     */
    public function getFaker()
    {
        return \Faker\Factory::create();
    }
}
