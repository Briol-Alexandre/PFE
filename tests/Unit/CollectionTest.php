<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Watch;
use App\Models\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(\Tests\TestCase::class, RefreshDatabase::class);

test('user can create a collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    expect($user->can('create', Collection::class))->toBeTrue();
});

test('creator cannot create a collection', function () {
    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    expect($creator->can('create', Collection::class))->toBeFalse();
});

test('user can add watch to their collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($user->can('addWatch', [Collection::class, $watch]))->toBeTrue();
});

test('user cannot add same watch twice to their collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    expect($user->can('addWatch', [$watch]))->toBeFalse();
});

test('creator cannot add watch to collection', function () {
    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($creator->can('addWatch', [Collection::class, $watch]))->toBeFalse();
});

test('user can remove watch from their collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user->can('removeWatch', $collection))->toBeTrue();
});

test('user cannot remove watch from other users collection', function () {
    $user1 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $user2 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user2
    $user2->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user2->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user1->can('removeWatch', $collection))->toBeFalse();
});

test('creator cannot remove watch from any collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($creator->can('removeWatch', $collection))->toBeFalse();
});

test('user can view their own collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user->can('view', $collection))->toBeTrue();
});

test('user cannot view another user\'s collection', function () {
    $user1 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $user2 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user2
    $user2->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user2->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user1->can('view', $collection))->toBeFalse();
});

test('creator cannot view any collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($creator->can('view', $collection))->toBeFalse();
});

test('user can update their own collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user->can('update', $collection))->toBeTrue();
});

test('user cannot update another user\'s collection', function () {
    $user1 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $user2 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user2
    $user2->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user2->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user1->can('update', $collection))->toBeFalse();
});

test('creator cannot update any collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($creator->can('update', $collection))->toBeFalse();
});

test('user can delete their own collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user->can('delete', $collection))->toBeTrue();
});

test('user cannot delete another user\'s collection', function () {
    $user1 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $user2 = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user2
    $user2->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user2->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($user1->can('delete', $collection))->toBeFalse();
});

test('creator cannot delete any collection', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    // Ajouter la montre à la collection de user
    $user->collection()->create([
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    // Récupérer l'entrée de la collection
    $collection = Collection::where('user_id', $user->id)
        ->where('watch_id', $watch->id)
        ->first();

    expect($creator->can('delete', $collection))->toBeFalse();
});
