<?php

namespace Tests\Feature;

use App\Http\Resources\SalonResource;
use App\Promotion;
use App\Salon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Collection;
use Tests\TestCase;

class SalonTest extends TestCase
{
    use RefreshDatabase;

    public string $apiUrl;
    public Model $record;
    public string $submitMethod;
    private $adminUser;

    public function setUp(): void
    {
        parent::setUp();
        $this->apiUrl = 'api/salons';
        $this->record = new Salon();
        $this->adminUser = factory('App\AdminUser', 1)->make();
        $this->actingAs($this->adminUser->first(), 'api');
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

    public function testSalonPutEndpoint()
    {
        $this->withoutExceptionHandling();
        $salon = factory('App\Salon')->create();
        $this->assertDatabaseHas('salons', $salon->toArray());
        $response = $this->put($this->apiUrl . '/' .$salon->id, $salon->toArray());
        $this->assertDatabaseHas('salons', $salon->toArray());
        $response->assertStatus(200);
//        dd($response->getData()->data);
        dd((new SalonResource($this->adminUser->first()->salon)));
//        dd(response(new SalonResource($this->adminUser->first()->salon))->content());
//        $this->assertEquals($response->content(), ->toJson());
    }
}
