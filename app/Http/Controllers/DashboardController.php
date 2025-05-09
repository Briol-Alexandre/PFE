<?php

namespace App\Http\Controllers;

use App\Models\Watch;
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

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user->load('collection.creator')
            ]
        ]);
    }
}
