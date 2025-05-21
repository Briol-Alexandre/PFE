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
    private User $creator;
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
        $this->creator = User::factory()->create(['role' => 'creator']);

        // Créer une montre par le créateur
        $this->watch = Watch::factory()->create([
            'user_id' => $this->creator->id,
            'model' => 'Test Watch',
            'movement' => 'automatique'
        ]);

        // Créer une collection pour le owner
        $this->collection = Collection::factory()->create([
            'user_id' => $this->owner->id,
            'watch_id' => $this->watch->id,
            'purchase_date' => now(),
            'warranty_end_date' => now()->addYear()
        ]);

        // Créer une réparation
        $this->repair = Repair::factory()->create([
            'collection_id' => $this->collection->id,
            'description' => 'Test repair',
            'status' => 'asked',
            'price' => null,
            'date' => null
        ]);

        $this->policy = new RepairPolicy();

        // Simuler un utilisateur connecté
        $this->actingAs($this->owner);
    }

    /** @test */
    public function user_can_create_repair()
    {
        $this->assertTrue($this->policy->create($this->owner));
    }

    /** @test */
    public function creator_cannot_create_repair()
    {
        $this->actingAs($this->creator);
        $this->assertTrue($this->policy->create($this->creator));
    }

    /** @test */
    public function user_can_view_own_repairs()
    {
        $this->assertTrue($this->policy->view($this->owner, $this->repair));
    }

    /** @test */
    public function user_cannot_view_others_repairs()
    {
        $this->assertFalse($this->policy->view($this->otherUser, $this->repair));
    }

    /** @test */
    public function creator_can_only_view_creator_repairs()
    {
        // Le créateur ne peut pas voir la vue normale
        $this->assertFalse($this->policy->view($this->creator, $this->repair));

        // Le créateur peut voir la vue créateur si c'est sa montre
        $this->assertTrue($this->policy->viewCreator($this->creator, $this->repair));

        // Créer une autre montre avec un autre créateur
        $otherCreator = User::factory()->create(['role' => 'creator']);
        $otherWatch = Watch::factory()->create([
            'user_id' => $otherCreator->id,
            'model' => 'Other Watch',
            'movement' => 'quartz'
        ]);
        $otherCollection = Collection::factory()->create([
            'user_id' => $this->owner->id,
            'watch_id' => $otherWatch->id,
            'purchase_date' => now(),
            'warranty_end_date' => now()->addYear()
        ]);
        $otherRepair = Repair::factory()->create([
            'collection_id' => $otherCollection->id,
            'description' => 'Other repair',
            'status' => 'asked'
        ]);

        // Le créateur ne peut pas voir la vue créateur d'une montre qu'il n'a pas créée
        $this->assertFalse($this->policy->viewCreator($this->creator, $otherRepair));

        // L'autre créateur peut voir la vue créateur de sa montre
        $this->assertTrue($this->policy->viewCreator($otherCreator, $otherRepair));
    }

    /** @test */
    public function user_can_update_own_repair_when_asked()
    {
        $this->repair->status = 'asked';
        $this->assertTrue($this->policy->update($this->owner, $this->repair));
    }

    /** @test */
    public function user_cannot_update_repair_when_pending()
    {
        $this->repair->status = 'pending';
        $this->assertFalse($this->policy->update($this->owner, $this->repair));
    }

    /** @test */
    public function creator_can_edit_estimate_and_complete_repair()
    {
        $this->repair->status = 'asked';
        
        // Le créateur peut éditer l'estimation
        $this->assertTrue($this->policy->edit_estimate($this->creator, $this->repair));
        
        // Le créateur peut marquer comme terminé quand en cours
        $this->repair->status = 'in_progress';
        $this->assertTrue($this->policy->completed($this->creator, $this->repair));
        
        // Un autre utilisateur ne peut pas faire ces modifications
        $this->assertFalse($this->policy->edit_estimate($this->otherUser, $this->repair));
        $this->assertFalse($this->policy->completed($this->otherUser, $this->repair));
    }

    /** @test */
    public function user_can_accept_or_refuse_repair()
    {
        $this->repair->status = 'pending';
        
        // Le propriétaire peut accepter ou refuser
        $this->assertTrue($this->policy->accept($this->owner, $this->repair));
        $this->assertTrue($this->policy->refuse_user($this->owner, $this->repair));
        
        // Personne d'autre ne peut accepter ou refuser
        $this->assertFalse($this->policy->accept($this->creator, $this->repair));
        $this->assertFalse($this->policy->refuse_user($this->creator, $this->repair));
        $this->assertFalse($this->policy->accept($this->otherUser, $this->repair));
        $this->assertFalse($this->policy->refuse_user($this->otherUser, $this->repair));
    }

    /** @test */
    public function creator_can_refuse_repair()
    {
        $this->repair->status = 'asked';
        
        // Le créateur peut refuser
        $this->assertTrue($this->policy->refuse_creator($this->creator, $this->repair));
        
        // Un autre utilisateur ne peut pas refuser
        $this->assertFalse($this->policy->refuse_creator($this->otherUser, $this->repair));
    }

    /** @test */
    public function user_can_delete_own_repair()
    {
        $this->assertTrue($this->policy->delete($this->owner, $this->repair));
        $this->assertFalse($this->policy->delete($this->otherUser, $this->repair));
    }
}
