<?php

namespace Tests\Feature;

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

        $user = factory('App\AdminUser', 1)->make();
        $this->actingAs($user->first(), 'api');

        $response = $this->get($this->apiUrl);

        $response->assertStatus(200);
    }
}
