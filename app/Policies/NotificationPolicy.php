<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Notifications\DatabaseNotification;

class NotificationPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {

    }

    public function view(User $user, DatabaseNotification $notification)
    {
        return $user->isCreator() || $notification->notifiable_id === $user->id;
    }

    public function viewAny(User $user)
    {
        return $user->isCreator();
    }

    public function destroy(User $user, DatabaseNotification $notification = null)
    {
        return $user->isCreator() || $notification->notifiable_id === $user->id;
    }
}
