<?php

namespace App\Http\Controllers;

use App\Http\Requests\WatchStoreRequest;
use App\Models\Watches;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $watches = Watches::all();

        return Inertia::render('Watch/Index', [
            'watches' => $watches,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Watch/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WatchStoreRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('watches', 'public');
            $validated['image'] = Storage::url($path);
        }

        $watch = Watches::create($validated);
        return Inertia::location(route('watch.show', $watch->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $watch = Watches::findOrFail($id);
        return Inertia::render('Watch/Single', [
            'watch' => $watch,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $watch = Watches::findOrFail($id);
        return Inertia::render('Watch/Edit', [
            'watch' => $watch,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $watch = Watches::findOrFail($id);
        
        $data = $request->all();
        
        // Gestion de l'image
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($watch->image) {
                $oldPath = str_replace('/storage/', '', $watch->image);
                Storage::disk('public')->delete($oldPath);
            }
            
            // Sauvegarder la nouvelle image
            $path = $request->file('image')->store('watches', 'public');
            $data['image'] = '/storage/' . $path;
        }
        
        $watch->update($data);

        return Inertia::location(route('watch.show', $watch->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $watch = Watches::findOrFail($id);
        if ($watch->image) {
            $path = str_replace('/storage/', '', $watch->image);
            Storage::disk('public')->delete($path);
        }
        $watch->delete();
        return Inertia::location(route('watch.index'));
    }
}
