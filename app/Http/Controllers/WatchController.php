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
            // Déterminer le disque à utiliser en fonction de l'environnement
            $disk = env('APP_ENV') === 'production' ? 's3' : 'public';
            $path = $request->file('image')->store('watches', $disk);

            // Générer l'URL appropriée selon le disque
            if ($disk === 's3') {
                $validated['image'] = Storage::disk('s3')->url($path);
            } else {
                $validated['image'] = Storage::url($path);
            }
        }

        $validated['available_straps'] = array_map('trim', explode(',', $validated['available_straps']));
        $validated['available_sizes'] = array_map('trim', explode(',', $validated['available_sizes']));
        $validated['available_movements'] = array_map('trim', explode(',', $validated['available_movements']));

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

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image
            if ($watch->image) {
                // Déterminer si l'image est sur S3 ou en local
                if (strpos($watch->image, 'amazonaws.com') !== false || strpos($watch->image, env('AWS_URL', '')) !== false) {
                    // Image sur S3
                    $oldPath = parse_url($watch->image, PHP_URL_PATH);
                    if ($oldPath) {
                        $oldPath = preg_replace('/^.*?watches\//', 'watches/', ltrim($oldPath, '/'));
                        Storage::disk('s3')->delete($oldPath);
                    }
                } else {
                    // Image locale
                    $oldPath = str_replace('/storage/', '', $watch->image);
                    Storage::disk('public')->delete($oldPath);
                }
            }

            // Déterminer le disque à utiliser en fonction de l'environnement
            $disk = env('APP_ENV') === 'production' ? 's3' : 'public';
            $path = $request->file('image')->store('watches', $disk);

            // Générer l'URL appropriée selon le disque
            if ($disk === 's3') {
                $data['image'] = Storage::disk('s3')->url($path);
            } else {
                $data['image'] = '/storage/' . $path;
            }
        }
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

        if ($request->has('available_movements')) {
            $data['available_movements'] = $request->input('available_movements') ?
                array_values(array_filter(array_map('trim', explode(',', $request->input('available_movements'))))) :
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
            // Déterminer si l'image est sur S3 ou en local
            if (strpos($watch->image, 'amazonaws.com') !== false || strpos($watch->image, env('AWS_URL', '')) !== false) {
                // Image sur S3
                $oldPath = parse_url($watch->image, PHP_URL_PATH);
                if ($oldPath) {
                    $oldPath = preg_replace('/^.*?watches\//', 'watches/', ltrim($oldPath, '/'));
                    Storage::disk('s3')->delete($oldPath);
                }
            } else {
                // Image locale
                $path = str_replace('/storage/', '', $watch->image);
                Storage::disk('public')->delete($path);
            }
        }
        $watch->delete();
        return Inertia::location(route('watch.index'));
    }
}
