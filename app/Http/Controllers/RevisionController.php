<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Revisions;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RevisionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->role !== 'creator') {
            abort(403);
        }

        $revisions = Revisions::orderBy('name')->get();
        return Inertia::render('Revision/Index', [
            'revisions' => $revisions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (auth()->user()->role !== 'creator') {
            abort(403);
        }

        return Inertia::render('Revision/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (auth()->user()->role !== 'creator') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Générer le type à partir du nom (remplacer les espaces par _, enlever les caractères spéciaux)
        $type = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '_', $validated['name']));
        $validated['type'] = trim($type, '_');

        Revisions::create($validated);

        return redirect()->route('revision.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (auth()->user()->role !== 'creator') {
            abort(403);
        }

        $revision = Revisions::findOrFail($id);
        return Inertia::render('Revision/Show', [
            'revision' => $revision
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (auth()->user()->role !== 'creator') {
            abort(403);
        }

        $revision = Revisions::findOrFail($id);
        return Inertia::render('Revision/Edit', [
            'revision' => $revision
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (auth()->user()->role !== 'creator') {
            abort(403);
        }

        $revision = Revisions::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Générer le type à partir du nom (remplacer les espaces par _, enlever les caractères spéciaux)
        $type = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '_', $validated['name']));
        $validated['type'] = trim($type, '_');

        $revision->update($validated);

        return redirect()->route('revision.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (auth()->user()->role !== 'creator') {
            abort(403);
        }

        $revision = Revisions::findOrFail($id);
        $revision->delete();

        return redirect()->route('revision.index');
    }
}
