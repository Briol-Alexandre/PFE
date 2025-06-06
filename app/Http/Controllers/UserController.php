<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', User::class);
        return Inertia::render('User/Index', [
            'users' => User::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', User::class);
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:user,creator'
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role']
        ]);

        return redirect()->route('users.index')->with('success', 'Utilisateur créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with([
            'collection.watch.creator',
            'collection.repairs'
        ])->findOrFail($id);
        $this->authorize('view', $user);

        $collections = $user->collection;

        return Inertia::render('User/Show', [
            'user' => $user,
            'watches' => $collections->map(function ($collection) {
                $watch = $collection->watch;
                if (!$watch)
                    return null;

                return array_merge($watch->toArray(), [
                    'collection_id' => $collection->id,
                    'purchase_date' => $collection->purchase_date,
                    'warranty_end_date' => $collection->warranty_end_date,
                ]);
            })->filter()->values(),
            'repairs' => $collections
                ->flatMap(fn($collection) => $collection->repairs)
                ->sortByDesc('created_at')
                ->values(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
