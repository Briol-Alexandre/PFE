<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Watch;
use Illuminate\Auth\Access\HandlesAuthorization;

class WatchPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any watches.
     */
    public function viewAny(User $user): bool
    {
        return true; // Tout le monde peut voir la liste des montres
    }

    /**
     * Determine whether the user can view the watch.
     */
    public function view(User $user, Watch $watch): bool
    {
        return $user->isCreator();
    }

    /**
     * Determine whether the user can view the single page of the watch.
     */
    public function viewSingle(User $user, Watch $watch): bool
    {
        return $user->isCreator();
    }

    /**
     * Determine whether the user can create watches.
     */
    public function create(User $user): bool
    {
        return $user->isCreator();
    }

    /**
     * Determine whether the user can update the watch.
     */
    public function update(User $user, Watch $watch): bool
    {
        return $user->isCreator() && $user->id === $watch->user_id;
    }

    /**
     * Determine whether the user can delete the watch.
     */
    public function delete(User $user, Watch $watch): bool
    {
        return $user->isCreator() && $user->id === $watch->user_id;
    }
}
