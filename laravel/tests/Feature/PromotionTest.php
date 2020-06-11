<?php

namespace Tests\Feature;

use App\Http\Resources\PromotionCollection;
use App\Http\Resources\PromotionResource;
use App\Promotion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PromotionTest extends TestCase
{
    use RefreshDatabase;

    protected string $apiUrl;

    public function setUp(): void
    {
        parent::setUp();
        $this->apiUrl = 'api/promotions';
    }

    /**
     * getPromotionsListTest
     *
     * @return void
     */
    public function testPromotionGetEndpoint()
    {
        $this->withoutExceptionHandling();
        $user = factory('App\AdminUser', 1)->make();
        factory('App\Promotion', 2)->create();
        $this->actingAs($user->first(), 'api');
        $dbPromotion = Promotion::all();
        $response = $this->get($this->apiUrl);
        $response->assertStatus(200);
        $resourceResponse = PromotionResource::collection($dbPromotion)->response()->getData(true);
        $response->assertJson($resourceResponse);
    }

    /**
     * postPromotionsListTest
     *
     * @return void
     */
    public function testPromotionPostEndpoint()
    {
        $this->withoutExceptionHandling();
        $user = factory('App\AdminUser', 1)->make();
        $promotion = factory('App\Promotion')->make();
        $this->actingAs($user->first(), 'api');
        $response = $this->post($this->apiUrl, $promotion->toArray());
        $this->assertDatabaseHas('promotions', $promotion->toArray());
        $response->assertStatus(200);
        $dbPromotion = Promotion::first();
        $this->assertEquals($dbPromotion->name, $promotion->name);
        $resourceResponse = (new PromotionCollection(Promotion::all()))->response()->getData(true);
        $response->assertJson($resourceResponse);
    }
}
