<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any users.
     */
    public function viewAny(User $user): bool
    {
        return $user->isCreator();
    }

    /**
     * Determine whether the user can view the watch.
     */
    public function view(User $user): bool
    {
        return $user->isCreator();
    }

    /**
     * Determine whether the user can view the single page of the watch.
     */
    public function viewSingle(User $user): bool
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
    public function update(User $user): bool
    {
        return $user->isCreator();
    }

    /**
     * Determine whether the user can delete the watch.
     */
    public function delete(User $user): bool
    {
        return $user->isCreator();
    }
}
