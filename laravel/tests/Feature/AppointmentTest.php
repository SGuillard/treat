<?php

namespace Tests\Feature;

use App\AdminUser;
use App\Appointment;
use http\Client\Curl\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AppointmentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetAppointmentList()
    {
        $this->withoutExceptionHandling();
        $this->actingAs(AdminUser::first(), 'api');
        $response = $this->get('/api/appointments');
        $response->assertStatus(200);
    }

    public function testAddAppointment()
    {
        Appointment::create();
    }
}
