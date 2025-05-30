<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Inertia\Inertia;
use App\Models\Watch;
use App\Http\Requests\CollectionStoreRequest;
use App\Http\Requests\CollectionUpdateRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Repair;

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

        // Récupérer les IDs des montres déjà dans la collection de l'utilisateur
        $userWatchIds = Collection::where('user_id', auth()->id())
            ->pluck('watch_id')
            ->toArray();

        // Récupérer toutes les montres sauf celles déjà dans la collection
        $watches = Watch::with('creator')
            ->whereNotIn('id', $userWatchIds)
            ->get();

        return Inertia::render('Collection/Create', [
            'watches' => $watches,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CollectionStoreRequest $request)
    {
        $this->authorize('create', Collection::class);

        $data = [
            'user_id' => auth()->id(),
            'watch_id' => $request->watch_id,
            'purchase_date' => $request->purchase_date,
            'warranty_end_date' => $request->warranty_end_date
        ];

        if ($request->hasFile('warranty_image')) {
            $path = $request->file('warranty_image')->store('warranty_images', 'public');
            $data['warranty_image'] = $path;
        }

        Collection::create($data);

        return redirect()->route('collection.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $collection = Collection::with('watch.creator')->findOrFail($id);

        // Réparations à venir
        $upcoming_repairs = Repair::where('collection_id', $id)
            ->where(function ($query) {
                $query->whereNull('date')
                    ->orWhere('date', '>', now());
            })
            ->with('collection.watch')
            ->get();

        // Réparations passées
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
