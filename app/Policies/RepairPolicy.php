<?php

namespace App\Policies;

use App\Models\Repair;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RepairPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Repair $repair): bool
    {
        // Seul l'utilisateur normal peut voir la vue normale
        if ($user->role === 'creator') {
            return false;
        }
        return $repair->collection->user_id === $user->id;
    }

    /**
     * Determine whether the user can view the creator version of the model.
     */
    public function viewCreator(User $user, Repair $repair): bool
    {
        // Seul le créateur de la montre peut voir la vue créateur
        if ($user->role !== 'creator') {
            return false;
        }
        return $repair->collection->watch->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // L'utilisateur doit être connecté pour créer une réparation
        return auth()->check();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Repair $repair): bool
    {
        return $repair->collection->user_id === $user->id && $repair->status === 'asked';
    }

    public function accept(User $user, Repair $repair): bool
    {
        return $repair->collection->user_id === $user->id && $repair->status === 'pending';
    }

    public function edit_estimate(User $user, Repair $repair): bool
    {
        return $repair->collection->watch->user_id === $user->id && $repair->status === 'asked';
    }


    public function refuse_user(User $user, Repair $repair): bool
    {
        return $repair->collection->user_id === $user->id && $repair->status === 'pending';
    }
    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Repair $repair): bool
    {
        return $repair->collection->user_id === $user->id;
    }

    public function refuse_creator(User $user, Repair $repair): bool
    {
        return $repair->collection->watch->user_id === $user->id && $repair->status === 'asked';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Repair $repair): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Repair $repair): bool
    {
        return false;
    }
}
