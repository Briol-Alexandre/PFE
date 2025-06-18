<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Collection;
use App\Models\Revisions;
use App\Http\Requests\RepairStoreRequest;
use App\Http\Requests\RepairUpdateRequest;
use App\Http\Requests\RepairUpdateEstimateRequest;
use App\Http\Requests\RepairAcceptRequest;
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
        $this->authorize('viewAny', Repair::class);
        $user = auth()->user();

        $with = ['collection.watch.creator', 'collection.user'];

        $baseQuery = Repair::with($with);
        if ($user->role === 'creator') {
            $baseQuery->whereHas('collection.watch', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            });
        } else {
            $baseQuery->whereHas('collection', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            });
        }

        $repairs = (clone $baseQuery)->get();

        $asked_repairs = (clone $baseQuery)
            ->where('status', 'asked')
            ->get();

        $upcomming_repairs = (clone $baseQuery)
            ->where('status', 'accepted')
            ->where('date', '>', now())
            ->get();

        $past_repairs = (clone $baseQuery)
            ->where('status', 'completed')
            ->get();
        $rejected_repairs = (clone $baseQuery)
            ->where('status', 'rejected')
            ->get();

        $in_progress_repairs = (clone $baseQuery)
            ->where('status', 'in_progress')
            ->get();
        $pending_repairs = (clone $baseQuery)
            ->where('status', 'pending')
            ->get();

        return Inertia::render('Repair/Index', [
            'repairs' => $repairs,
            'asked_repairs' => $asked_repairs,
            'upcomming_repairs' => $upcomming_repairs,
            'past_repairs' => $past_repairs,
            'rejected_repairs' => $rejected_repairs,
            'in_progress_repairs' => $in_progress_repairs,
            'pending_repairs' => $pending_repairs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Repair::class);

        $collections = Collection::where('user_id', auth()->id())
            ->with('watch.creator')
            ->get();
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

        $revisions = Revisions::whereIn('id', $validated['revision_ids'])->get()
            ->map(function ($revision) {
                return [
                    'id' => $revision->id,
                    'name' => $revision->name,
                    'price' => $revision->price
                ];
            })->toArray();

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
        $repair = Repair::with(['collection.user', 'collection.watch.creator'])->findOrFail($id);
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

        $collections = Collection::where('user_id', auth()->id())
            ->with('watch.creator')
            ->get();
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

        $validated = $request->validated();

        \Log::info('Données reçues dans update_estimate:', [
            'validated' => $validated,
            'repair_id' => $id
        ]);

        if ($validated['status'] === 'pending' && empty($validated['proposed_dates'])) {
            \Log::error('Dates proposées manquantes');
            return back()->withErrors(['proposed_dates' => 'Vous devez proposer au moins une date']);
        }

        if ($validated['status'] === 'modified') {
            unset($validated['date']);
            unset($validated['proposed_dates']);
        }

        try {
            $repair->update($validated);
            \Log::info('Réparation mise à jour avec succès', ['repair_id' => $repair->id]);
            return redirect()->route('repair.show_creator', $repair);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour de la réparation', [
                'repair_id' => $repair->id,
                'error' => $e->getMessage()
            ]);
            return back()->withErrors(['general' => 'Une erreur est survenue lors de la mise à jour']);
        }
    }

    public function accept(RepairAcceptRequest $request, string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('accept', $repair);

        $validated = $request->validated();

        \Log::info('Accept repair - Données reçues:', [
            'status' => $repair->status,
            'date_choisie' => $validated['date'],
            'dates_proposées' => $repair->proposed_dates
        ]);

        if ($repair->status === 'modified') {
            $repair->update([
                'status' => 'accepted'
            ]);

            \Log::info('Réparation modifiée acceptée avec succès', ['repair_id' => $repair->id]);
            return redirect()->route('repair.show', $repair);
        }

        $chosenDate = new \DateTime($validated['date']);
        $proposedDates = array_map(function ($date) {
            return (new \DateTime($date))->format('Y-m-d\TH:i:s.u\Z');
        }, $repair->proposed_dates);

        $normalizedChosenDate = $chosenDate->format('Y-m-d\TH:i:s.u\Z');

        \Log::info('Dates normalisées:', [
            'date_choisie' => $normalizedChosenDate,
            'dates_proposées' => $proposedDates
        ]);

        if (!in_array($normalizedChosenDate, $proposedDates)) {
            \Log::error('Date non trouvée dans les dates proposées');
            return back()->withErrors(['date' => 'La date choisie doit faire partie des dates proposées']);
        }

        $repair->update([
            'status' => 'accepted',
            'date' => $normalizedChosenDate
        ]);

        \Log::info('Réparation acceptée avec succès', ['repair_id' => $repair->id]);
        return redirect()->route('repair.show', $repair);
    }

    public function refuse_user(string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('refuse_user', $repair);
        $repair->update(['status' => 'rejected']);
        return redirect()->route('repair.show', $repair);
    }

    public function refuse_creator(string $id, RepairUpdateEstimateRequest $request)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('refuse_creator', $repair);
        $repair->update($request->validated());
        return redirect()->route('repair.show_creator', $repair);
    }

    public function completed(string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('completed', $repair);
        $repair->update(['status' => 'completed']);
        return redirect()->route('repair.show_creator', $repair);
    }

    public function start(string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('start', $repair);
        $repair->update(['status' => 'in_progress']);
        return redirect()->route('repair.show_creator', $repair);
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

    public function modify_price_and_date(string $id)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('modify_price_and_date', $repair);

        return Inertia::render('Repair/ModifyPriceAndDate', [
            'repair' => $repair
        ]);
    }

    public function update_price_and_date(string $id, RepairUpdateEstimateRequest $request)
    {
        $repair = Repair::findOrFail($id);
        $this->authorize('modify_price_and_date', $repair);

        $validated = $request->validated();

        $repair->update([
            'price' => $validated['price'],
            'status' => 'modified',
            'modify_reason' => $validated['modify_reason'] ?? null
        ]);

        return redirect()->route('repair.show_creator', $repair);
    }
}
