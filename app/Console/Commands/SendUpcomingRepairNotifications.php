<?php

namespace App\Console\Commands;

use App\Models\Repair;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Notifications\RepairStatusUpdated;

class SendUpcomingRepairNotifications extends Command
{
    protected $signature = 'repairs:notify-upcoming';
    protected $description = 'Send notifications for repairs scheduled for tomorrow';

    public function handle()
    {
        $tomorrow = Carbon::tomorrow();
        
        $repairs = Repair::where('status', 'accepted')
            ->whereDate('date', $tomorrow->toDateString())
            ->get();

        foreach ($repairs as $repair) {
            $repair->collection->user->notify(new RepairStatusUpdated($repair));
        }

        $this->info(count($repairs) . ' notifications sent.');
    }
}
