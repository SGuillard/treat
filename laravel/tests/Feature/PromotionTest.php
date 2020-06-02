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
    public function testGetPromotionList()
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
}
