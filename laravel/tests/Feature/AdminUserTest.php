<?php

namespace Tests\Feature;

use App\AdminUser;
use App\Http\Resources\Admin\AdminUserResource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminUserTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->apiUrl = 'api/adminUser';
    }

    /**
     * GET
     */
    public function testGetEndpoint()
    {
        $this->withoutExceptionHandling();
        $user = factory('App\AdminUser', 1)->make();
        $this->actingAs($user->first(), 'api');
        $response = $this->get($this->apiUrl);
        $response->assertStatus(200);
    }

    /**
     * POST
     */
    public function testPostEndpoint()
    {
        $this->withoutExceptionHandling();
        $userFactory = factory('App\AdminUser', 1);
        $adminUser = $userFactory->make()->first()->toArray();
        $this->actingAs($userFactory->make()->first(), 'api');
        $response = $this->post($this->apiUrl, $adminUser);
        $response->assertStatus(200);
        $dbUser = AdminUser::first();
        $response->assertJsonPath('data.0', (new AdminUserResource($dbUser))->toArray($dbUser));
        $this->assertDatabaseHas('admin_users', $adminUser);
    }

    /**
     * PUT
     */
    public function testPutEndpoint()
    {
        $this->withoutExceptionHandling();
        $userFactory = factory('App\AdminUser', 1);
        $adminUser = AdminUser::create($userFactory->raw()[0]);
        $adminUserDataTest = $adminUser;
        $adminUserDataTest->active = !$adminUser->active;
        $this->actingAs($userFactory->make()->first(), 'api');
        $response = $this->put($this->apiUrl . '/' . $adminUser->id, $adminUserDataTest->toArray());
        $response->assertStatus(200);
        $dbUser = AdminUser::first();
        $response->assertJsonPath('data.0', (new AdminUserResource($dbUser))->toArray($dbUser));
        $this->assertDatabaseHas('admin_users', $adminUserDataTest->toArray());
    }


}
