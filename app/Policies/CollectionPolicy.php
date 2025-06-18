<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Watch;
use App\Models\Collection;
use Illuminate\Auth\Access\HandlesAuthorization;

class CollectionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view a specific collection.
     */
    public function view(User $user, Collection $collection): bool
    {
        return $user->isUser() && $user->id === $collection->user_id;
    }

    /**
     * Determine whether the user can update a specific collection.
     */
    public function update(User $user, Collection $collection): bool
    {
        return $user->isUser() && $user->id === $collection->user_id;
    }

    /**
     * Determine whether the user can delete a specific collection.
     */
    public function delete(User $user, Collection $collection): bool
    {
        return $user->isUser() && $user->id === $collection->user_id;
    }

    /**
     * Determine whether the user can view their collection.
     */
    public function viewAny(User $user): bool
    {
        return $user->isUser(); // Seuls les utilisateurs normaux peuvent voir les collections
    }

    /**
     * Determine whether the user can add a watch to their collection.
     */
    public function create(User $user, ?Watch $watch = null): bool
    {
        if (!$user->isUser()) {
            return true;
        }

        if ($watch) {
            return !Collection::where('user_id', $user->id)
                ->where('watch_id', $watch->id)
                ->exists();
        }

        return true;
    }

    /**
     * Determine whether the user can add a specific watch to their collection.
     */
    public function addWatch(User $user, Watch $watch): bool
    {
        return !$user->collection()->where('watch_id', $watch->id)->exists();
    }

    /**
     * Determine whether the user can remove a watch from their collection.
     */
    public function removeWatch(User $user, Collection $collection): bool
    {
        return $user->isUser() && $user->id === $collection->user_id;
    }
}
