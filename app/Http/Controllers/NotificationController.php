<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Inertia\Inertia;
use Illuminate\Auth\Access\AuthorizationException;

class NotificationController extends Controller
{
    /**
     * Display a listing of the notifications.
     */
    public function index()
    {
        $user = auth()->user();
        $this->authorize('viewAny', $user);

        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($notification) {
                return [
                    'id' => $notification->id,
                    'data' => $notification->data,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at
                ];
            });

        $notifications = $notifications->toArray();
        $notifications['links'] = $notifications['links'] ?? [];
        $notifications['data'] = $notifications['data'] ?? [];

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications
        ]);
    }

    /**
     * Mark a notification as read.
     */
    public function markAsRead($id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $this->authorize('view', $notification);
        $notification->markAsRead();

        return back();
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead()
    {
        $this->authorize('viewAny', auth()->user());
        auth()->user()->unreadNotifications->markAsRead();

        return back();
    }

    /**
     * Delete a notification.
     */
    public function destroy($id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);

        $notification->delete();

        return back();
    }
}
