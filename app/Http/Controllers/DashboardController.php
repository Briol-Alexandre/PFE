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
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'first_name' => $user->first_name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'collection' => $user->collection()->with('watch.creator')->get()
                ]
            ]
        ]);
    }
}
