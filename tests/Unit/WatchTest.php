<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Watch;
use App\Models\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(\Tests\TestCase::class, RefreshDatabase::class);

test('creator can create a watch', function () {
    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    expect($creator->can('create', Watch::class))->toBeTrue();
});

test('user cannot create a watch', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    expect($user->can('create', Watch::class))->toBeFalse();
});

test('creator can update their own watch', function () {
    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($creator->can('update', $watch))->toBeTrue();
});

test('creator cannot update other creators watch', function () {
    $creator1 = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $creator2 = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator2->id
    ]);

    expect($creator1->can('update', $watch))->toBeFalse();
});

test('user cannot update any watch', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($user->can('update', $watch))->toBeFalse();
});

test('creator can delete their own watch', function () {
    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($creator->can('delete', $watch))->toBeTrue();
});

test('creator cannot delete other creators watch', function () {
    $creator1 = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $creator2 = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator2->id
    ]);

    expect($creator1->can('delete', $watch))->toBeFalse();
});

test('creator can view single watch page', function () {
    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($creator->can('viewSingle', $watch))->toBeTrue();
});

test('user cannot view single watch page', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($user->can('viewSingle', $watch))->toBeFalse();
});

test('user can view single collection page', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    $collection = Collection::create([
        'user_id' => $user->id,
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    expect($user->can('view', $collection))->toBeTrue();
});

test('user cannot view other users collection page', function () {
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

    $collection = Collection::create([
        'user_id' => $user2->id,
        'watch_id' => $watch->id,
        'purchase_date' => now(),
        'warranty_end_date' => now()->addYears(2)
    ]);

    expect($user1->can('view', $collection))->toBeFalse();
});

test('user cannot delete any watch', function () {
    $user = User::factory()->create([
        'role' => User::ROLE_USER
    ]);

    $creator = User::factory()->create([
        'role' => User::ROLE_CREATOR
    ]);

    $watch = Watch::factory()->create([
        'user_id' => $creator->id
    ]);

    expect($user->can('delete', $watch))->toBeFalse();
});
