<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Inertia\Inertia;
use App\Models\Watch;
use App\Http\Requests\CollectionStoreRequest;
use App\Http\Requests\CollectionUpdateRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Repair;
use Illuminate\Support\Facades\Storage;

class CollectionController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Collection::class);
        $collections = Collection::where('user_id', auth()->id())
            ->with('watch.creator')
            ->get();
        return Inertia::render('Collection/Index', [
            'collections' => $collections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Collection::class);

        $userId = session('newUserId', auth()->id());

        $userWatchIds = Collection::where('user_id', $userId)
            ->pluck('watch_id')
            ->toArray();

        $watches = Watch::with('creator')
            ->whereNotIn('id', $userWatchIds)
            ->get();

        return Inertia::render('Collection/Create', [
            'watches' => $watches,
            'targetUserId' => $userId,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CollectionStoreRequest $request)
    {
        $this->authorize('create', Collection::class);

        $userId = $request->user_id ?? auth()->id();

        $data = [
            'user_id' => $userId,
            'watch_id' => $request->watch_id,
            'purchase_date' => $request->purchase_date,
            'warranty_end_date' => $request->warranty_end_date,
            'selected_strap' => $request->selected_strap,
            'selected_size' => $request->selected_size,
            'selected_movement' => $request->selected_movement
        ];

        if ($request->hasFile('warranty_image')) {
            // Déterminer le disque à utiliser en fonction de l'environnement
            $disk = env('APP_ENV') === 'production' ? 's3' : 'public';
            $path = $request->file('warranty_image')->store('warranty_images', $disk);
            
            // Générer l'URL appropriée selon le disque
            if ($disk === 's3') {
                $data['warranty_image'] = Storage::disk('s3')->url($path);
            } else {
                $data['warranty_image'] = $path;
            }
        }

        $collection = Collection::create($data);

        if ($userId != auth()->id()) {
            return redirect()->route('users.show', $userId)->with('success', 'Montre ajoutée à la collection avec succès.');
        }

        return redirect()->route('collection.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $collection = Collection::with('watch.creator')->findOrFail($id);

        $upcoming_repairs = Repair::where('collection_id', $id)
            ->where(function ($query) {
                $query->whereNull('date')
                    ->orWhere('date', '>', now());
            })
            ->with('collection.watch')
            ->get();

        $past_repairs = Repair::where('collection_id', $id)
            ->whereNotNull('date')
            ->where('date', '<', now())
            ->with('collection.watch')
            ->get();

        $this->authorize('view', $collection);
        return Inertia::render('Collection/Single', [
            'collection' => $collection,
            'upcoming_repairs' => $upcoming_repairs,
            'past_repairs' => $past_repairs,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $collection = Collection::with('watch.creator')->findOrFail($id);
        $this->authorize('update', $collection);
        return Inertia::render('Collection/Edit', [
            'collection' => $collection,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CollectionUpdateRequest $request, string $id)
    {
        $collection = Collection::findOrFail($id);
        $this->authorize('update', $collection);

        $collection->update($request->validated());

        return redirect()->route('collection.show', $collection->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $collection = Collection::findOrFail($id);
        $this->authorize('delete', $collection);
        $collection->delete();
        return Inertia::location(route('collection.index'));
    }
}
