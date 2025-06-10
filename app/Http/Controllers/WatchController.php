<?php

namespace App\Http\Controllers;

use App\Http\Requests\WatchStoreRequest;
use App\Http\Requests\WatchUpdateRequest;
use App\Models\Watch;
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
        $watches = Watch::with('creator')->get();

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

        // Conversion des champs string en array
        $validated['available_straps'] = array_map('trim', explode(',', $validated['available_straps']));
        $validated['available_sizes'] = array_map('trim', explode(',', $validated['available_sizes']));

        $watch = Watch::create($validated);
        return Inertia::location(route('watch.show', $watch->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $watch = Watch::with('creator')->findOrFail($id);
        return Inertia::render('Watch/Single', [
            'watch' => $watch,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $watch = Watch::with('creator')->findOrFail($id);
        return Inertia::render('Watch/Edit', [
            'watch' => $watch,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WatchUpdateRequest $request, string $id)
    {
        $watch = Watch::with('creator')->findOrFail($id);

        \Log::info('Données reçues:', $request->all());
        $data = $request->validated();
        \Log::info('Données validées:', $data);

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

        // Conversion des champs string en array
        if ($request->has('available_straps')) {
            $data['available_straps'] = $request->input('available_straps') ? 
                array_values(array_filter(array_map('trim', explode(',', $request->input('available_straps'))))) : 
                [];
        }

        if ($request->has('available_sizes')) {
            $data['available_sizes'] = $request->input('available_sizes') ? 
                array_values(array_filter(array_map('trim', explode(',', $request->input('available_sizes'))))) : 
                [];
        }

        $watch->update($data);
        \Log::info('Données après mise à jour:', $watch->toArray());

        return Inertia::location(route('watch.show', $watch->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $watch = Watch::with('creator')->findOrFail($id);
        if ($watch->image) {
            $path = str_replace('/storage/', '', $watch->image);
            Storage::disk('public')->delete($path);
        }
        $watch->delete();
        return Inertia::location(route('watch.index'));
    }
}
