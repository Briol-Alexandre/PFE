<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Repair;
use App\Models\Collection;
use App\Models\Watch;
use App\Models\Revisions;
use App\Policies\RepairPolicy;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RepairTest extends TestCase
{
    use RefreshDatabase;

    private User $owner;
    private User $otherUser;
    private Repair $repair;
    private Collection $collection;
    private Watch $watch;
    private RepairPolicy $policy;

    protected function setUp(): void
    {
        parent::setUp();

        // Créer les utilisateurs
        $this->owner = User::factory()->create();
        $this->otherUser = User::factory()->create();

        // Créer une montre
        $this->watch = Watch::factory()->create();

        // Créer une collection pour le propriétaire
        $this->collection = Collection::factory()->create([
            'user_id' => $this->owner->id,
            'watch_id' => $this->watch->id
        ]);

        // Créer une réparation
        $this->repair = Repair::factory()->create([
            'collection_id' => $this->collection->id
        ]);

        $this->policy = new RepairPolicy();
    }

    /** @test */
    public function owner_can_view_repair()
    {
        $this->assertTrue($this->policy->view($this->owner, $this->repair));
    }

    /** @test */
    public function other_user_cannot_view_repair()
    {
        $this->assertFalse($this->policy->view($this->otherUser, $this->repair));
    }

    /** @test */
    public function owner_can_update_repair()
    {
        $this->assertTrue($this->policy->update($this->owner, $this->repair));
    }

    /** @test */
    public function other_user_cannot_update_repair()
    {
        $this->assertFalse($this->policy->update($this->otherUser, $this->repair));
    }

    /** @test */
    public function owner_can_delete_repair()
    {
        $this->assertTrue($this->policy->delete($this->owner, $this->repair));
    }

    /** @test */
    public function other_user_cannot_delete_repair()
    {
        $this->assertFalse($this->policy->delete($this->otherUser, $this->repair));
    }

    /** @test */
    public function authenticated_user_can_create_repair()
    {
        $this->actingAs($this->owner);
        $this->assertTrue($this->policy->create($this->owner));
    }

    /** @test */
    public function guest_cannot_create_repair()
    {
        $this->assertFalse($this->policy->create(new User()));
    }
}