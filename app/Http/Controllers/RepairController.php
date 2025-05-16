<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Collection;
use App\Models\Revisions;
use App\Http\Requests\RepairStoreRequest;
use App\Http\Requests\RepairUpdateRequest;
use App\Http\Requests\RepairUpdateEstimateRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class RepairController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Repair::class);

        // Récupérer les montres de la collection de l'utilisateur
        $collections = Collection::where('user_id', auth()->id())
            ->with('watch.creator')
            ->get();

        // Récupérer toutes les révisions disponibles
        $revisions = Revisions::all();

        return Inertia::render('Repair/Create', [
            'collections' => $collections,
            'revisions' => $revisions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RepairStoreRequest $request)
    {
        $this->authorize('create', Repair::class);

        $validated = $request->validated();

        // Récupérer les informations complètes des révisions
        $revisions = Revisions::whereIn('id', $validated['revision_ids'])->get()
            ->map(function ($revision) {
                return [
                    'id' => $revision->id,
                    'name' => $revision->name,
                    'price' => $revision->price
                ];
            })->toArray();

        // Créer la réparation avec les données validées et les révisions
        $repair = Repair::create(array_merge(
            $validated,
            ['revisions' => $revisions]
        ));

        return redirect()->route('repair.show', $repair);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $repair = Repair::with('collection.watch.creator')->findOrFail($id);
        $this->authorize('view', $repair);

        return Inertia::render('Repair/Single', [
            'repair' => $repair
        ]);
    }

    public function show_creator(string $id)
    {
        $repair = Repair::with('collection.watch.creator')->findOrFail($id);
        $this->authorize('viewCreator', $repair);

        return Inertia::render('Repair/SingleCreator', [
            'repair' => $repair
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $repair = Repair::with('collection.watch.creator')->findOrFail($id);
        $this->authorize('update', $repair);

        // Récupérer les montres de la collection de l'utilisateur
        $collections = Collection::where('user_id', auth()->id())
            ->with('watch.creator')
            ->get();

        // Récupérer toutes les révisions disponibles
        $revisions = Revisions::all();

        return Inertia::render('Repair/Edit', [
            'repair' => $repair,
            'collections' => $collections,
            'revisions' => $revisions
        ]);
    }

    public function edit_estimate(string $id)
    {
        $repair = Repair::with('collection.watch.creator')->findOrFail($id);
        $this->authorize('edit_estimate', $repair);

        return Inertia::render('Repair/SetEstimate', [
            'repair' => $repair
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RepairUpdateRequest $request, string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('update', $repair);
        $repair->update($request->validated());
        return redirect()->route('repair.show', $repair);
    }

    public function update_estimate(RepairUpdateEstimateRequest $request, string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('edit_estimate', $repair);
        $repair->update($request->validated());
        return redirect()->route('repair.show_creator', $repair);
    }

    public function accept(string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('accept', $repair);
        $repair->update(['status' => 'accepted']);
        return redirect()->route('repair.show', $repair);
    }

    public function refuse_user(string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('refuse_user', $repair);
        $repair->update(['status' => 'rejected']);
        return redirect()->route('repair.show', $repair);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('delete', $repair);

        $repair->delete();

        return redirect()->route('collection.show', $repair->collection_id);
    }
}
