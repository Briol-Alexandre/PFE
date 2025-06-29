<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $query = Repair::query()
            ->with(['collection.watch.creator', 'collection.user'])
            ->whereHas('collection', function ($query) use ($user) {
                if ($user->role === 'creator') {
                    $query->whereHas('watch', function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    });
                } else {
                    $query->where('user_id', $user->id);
                }
            })
            ->whereIn('status', ['asked', 'pending', 'accepted', 'in_progress']);

        $repairs = $query->get()
            ->map(function ($repair) {
                $watch = $repair->collection->watch;
                $client = $repair->collection->user;

                $name = $repair->revisions[0]['name'] ?? 'Sans nom';
                $description = "Client : {$client->name} {$client->first_name}\n";
                $description .= "Montre : {$watch->brand} {$watch->model}\n";
                $description .= "Réparation(s) : {$name}\n";
                $description .= "État : {$this->translateStatus($repair->status)}";

                $startDate = Carbon::parse($repair->date ?? $repair->created_at);

                if ($repair->date && $repair->date->format('H:i:s') !== '00:00:00') {
                    $endDate = Carbon::parse($startDate)->addHour();
                } else {
                    $startDate = $startDate->startOfDay();
                    $endDate = $startDate->copy()->endOfDay();
                }

                return [
                    'id' => $repair->id,
                    'title' => $watch->model . ' - ' . $client->first_name . ' ' . $client->name,
                    'start' => $startDate,
                    'end' => $endDate,
                    'status' => $repair->status,
                    'description' => $description,
                    'allDay' => !($repair->date && $repair->date->format('H:i:s') !== '00:00:00')
                ];
            });

        return Inertia::render('Calendar/Index', [
            'repairs' => $repairs,
            'userRole' => $user->role
        ]);
    }

    private function translateStatus($status)
    {
        return match ($status) {
            'asked' => 'Demandée',
            'pending' => 'En attente',
            'accepted' => 'Acceptée',
            'in_progress' => 'En cours',
            'completed' => 'Terminée',
            'refused' => 'Refusée',
            'modified' => 'Modifiée',
            'canceled' => 'Annulée',
            default => $status
        };
    }
}
