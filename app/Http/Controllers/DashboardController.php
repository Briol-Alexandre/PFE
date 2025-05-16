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

            // Récupérer les IDs des montres du créateur
            $watchIds = $watches->pluck('id');

            // Réparations à venir pour les montres du créateur
            $upcoming_repairs = Repair::whereHas('collection.watch', function ($query) use ($watchIds) {
                $query->whereIn('id', $watchIds);
            })
            ->where(function ($query) {
                $query->whereNull('date')
                    ->orWhere('date', '>', now());
            })
            ->with('collection.watch')
            ->get();

            // Réparations passées pour les montres du créateur
            $past_repairs = Repair::whereHas('collection.watch', function ($query) use ($watchIds) {
                $query->whereIn('id', $watchIds);
            })
            ->whereNotNull('date')
            ->where('date', '<=', now())
            ->with('collection.watch')
            ->get();

            return Inertia::render('Dashboard-creator', [
                'auth' => [
                    'user' => $user
                ],
                'watches' => $watches,
                'upcoming_repairs' => $upcoming_repairs,
                'past_repairs' => $past_repairs
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
