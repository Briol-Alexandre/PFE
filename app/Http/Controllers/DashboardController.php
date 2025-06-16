<?php

namespace App\Http\Controllers;

use App\Models\Watch;
use App\Models\Repair;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Notifications\DatabaseNotification;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'creator') {
            $watches = Watch::where('user_id', $user->id)
                ->with('creator')
                ->get();

            // Récupérer les IDs des montres du créateur
            $watchIds = $watches->pluck('id');

            $asked_repairs = Repair::whereHas('collection.watch', function ($query) use ($watchIds) {
                $query->whereIn('id', $watchIds);
            })
                ->where('status', 'asked')
                ->with([
                    'collection.user',
                    'collection.watch'
                ])
                ->orderBy('created_at', 'desc')
                ->take(3)
                ->get();

            // Récupérer les notifications non lues pour le créateur
            $notifications = $user->notifications()
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($notification) {
                    return [
                        'id' => $notification->id,
                        'data' => $notification->data,
                        'read_at' => $notification->read_at,
                        'created_at' => $notification->created_at
                    ];
                });

            return Inertia::render('Dashboard-creator', [
                'auth' => [
                    'user' => $user
                ],
                'watches' => $watches,
                'asked_repairs' => $asked_repairs,
                'notifications' => $notifications
            ]);
        }

        // Obtenir les IDs des éléments de collection de l'utilisateur
        $collectionIds = $user->collection->pluck('id');

        // Réparations à venir
        $upcoming_repairs = Repair::whereIn('collection_id', $collectionIds)
            ->where(function ($query) {
                $query->whereNull('date')
                    ->orWhere('date', '>', now());
            })
            ->with('collection.watch')
            ->get();


        // Réparations passées
        $past_repairs = Repair::whereIn('collection_id', $collectionIds)
            ->whereNotNull('date')
            ->where('date', '<', now())
            ->with('collection.watch')
            ->get();



        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'first_name' => $user->first_name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'collection' => $user->collection()->with('watch.creator')->get(),
                ]
            ],
            'upcoming_repairs' => $upcoming_repairs,
            'past_repairs' => $past_repairs,
        ]);
    }

}
