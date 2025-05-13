<?php

namespace App\Http\Controllers;

use App\Models\Watch;
use App\Models\Repair;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'creator') {
            $watches = Watch::where('user_id', $user->id)
                ->with('creator')
                ->get();

            return Inertia::render('Dashboard-creator', [
                'auth' => [
                    'user' => $user
                ],
                'watches' => $watches
            ]);
        }

        // Obtenir les IDs des éléments de collection de l'utilisateur
        $collectionIds = $user->collection->pluck('id');

        // Réparations demandées (sans date)
        $asked_repairs = Repair::whereIn('collection_id', $collectionIds)
            ->whereNull('date')
            ->with('collection.watch')
            ->get();

        // Réparations à venir
        $upcoming_repairs = Repair::whereIn('collection_id', $collectionIds)
            ->whereNotNull('date')
            ->where('date', '>', now())
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
            'asked_repairs' => $asked_repairs,
            'upcoming_repairs' => $upcoming_repairs,
            'past_repairs' => $past_repairs,
        ]);
    }

}
