<?php

namespace Tests\Feature;

use App\Http\Resources\SalonResource;
use App\Promotion;
use App\Salon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SalonTest extends TestCase
{
    use RefreshDatabase;

    public string $apiUrl;
    public Model $record;
    public string $submitMethod;

    public function setUp(): void
    {
        parent::setUp();
        $this->apiUrl = 'api/salon';
        $this->record = new Salon();
        $user = factory('App\AdminUser', 1)->make();
        $this->actingAs($user->first(), 'api');
    }

    /**
     * Test get all salons.
     *
     * @return void
     */
    public function testGetAllSalons()
    {
        $this->withoutExceptionHandling();
        factory('App\Salon', 2)->create();
        $dbSalon = Salon::all();
        $response = $this->get($this->apiUrl);
        $response->assertStatus(200);
        $resourceResponse = SalonResource::collection($dbSalon)->response()->getData(true);
        $response->assertJson($resourceResponse);
    }

    public function testGetUserSalon()
    {
        $this->withoutExceptionHandling();
        factory('App\Salon', 1)->create();
        $dbSalon = Salon::first();
        $response = $this->get('api/userSalon');
        $response->assertStatus(200);
        $resourceResponse = (new SalonResource($dbSalon))->response()->getData(true);
        $response->assertJson($resourceResponse);
    }
}
