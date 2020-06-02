<?php

namespace Tests\Feature;

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
    public function testGetEndpoint()
    {
        $this->withoutExceptionHandling();
        $user = factory('App\AdminUser', 1)->make();
        $promotion = factory('App\Promotion', 1)->create();
        $this->actingAs($user->first(), 'api');
        $dbPromotion = Promotion::first();
        $response = $this->get($this->apiUrl);
        $response->assertStatus(200);
        $response->assertJsonPath('data.0', (new PromotionResource($dbPromotion))->toArray($dbPromotion));
    }

    /**
     * postPromotionsListTest
     *
     * @return void
     */
    public function testPostEndpoint()
    {
        $this->withoutExceptionHandling();
        $user = factory('App\AdminUser', 1)->make();
        $promotion = factory('App\Promotion', 1)->make()->first()->toArray();
        $this->actingAs($user->first(), 'api');
        $response = $this->post($this->apiUrl, $promotion);
        $this->assertDatabaseHas('promotions', $promotion);
        $response->assertStatus(200);
        $promotions = Promotion::with('service')->get();
        $response->assertSee(json_encode(PromotionResource::collection($promotions)));
    }
}
