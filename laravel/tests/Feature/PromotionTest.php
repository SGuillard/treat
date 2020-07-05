<?php

namespace Tests\Feature;

use App\Http\Resources\PromotionCollection;
use App\Http\Resources\PromotionResource;
use App\Promotion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\AbstractTestCase;

class PromotionTest extends AbstractTestCase
{
    use RefreshDatabase;

    public string $apiUrl;
    public Model $record;
    public string $submitMethod;

    public function setUp(): void
    {
        parent::setUp();
        $this->apiUrl = 'api/promotions';
        $this->record = new Promotion;
        $this->submitMethod = 'POST';
        $user = factory('App\AdminUser', 1)->make();
        $this->actingAs($user->first(), 'api');
    }

    /**
     * getPromotionsListTest
     *
     * @return void
     */
    public function testPromotionGetEndpoint()
    {
        $this->withoutExceptionHandling();
        factory('App\Promotion', 2)->create();
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

    /**
     * postPromotionsListTest
     *
     * @return void
     */
    public function testPromotionPutEndpoint()
    {
        $this->withoutExceptionHandling();
        $promotion = factory('App\Promotion')->create();
        $this->assertDatabaseHas('promotions', $promotion->toArray());
        $promotion->is_active = !$promotion->is_active;
        $response = $this->put($this->apiUrl . '/' .$promotion->id, $promotion->toArray());
        $this->assertDatabaseHas('promotions', $promotion->toArray());
        $response->assertStatus(200);
        $resourceResponse = (new PromotionCollection(Promotion::all()))->response()->getData(true);
        $response->assertJson($resourceResponse);
    }

    private function validateName()
    {
        $this->fieldIsRequired('name');
        $this->fieldIsString('name');
    }

    private function validateStartDate()
    {
        $this->fieldIsRequired('start_date');
        $this->fieldIsDateTime('start_date');
    }

    private function validateEndDate()
    {
        $this->fieldIsRequired('end_date');
        $this->fieldIsDateTime('end_date');
        $this->firstDateIsAfterSecondDate('end_date', 'start_date');
    }

    private function validateDay()
    {
        $this->fieldIsNumber('day');
        $this->fieldIsBetween('day', 0, 8);
    }

    private function validateStartHour()
    {
        $this->fieldIsHour('start_hour');
    }

    public function testStoreRequestValidation()
    {
        $this->submitMethod = 'POST';
        $this->validateName();
        $this->validateStartDate();
        $this->validateEndDate();
        $this->validateDay();
        $this->validateStartHour();
    }

}
