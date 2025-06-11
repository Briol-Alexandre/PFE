<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Revisions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Collection;
use App\Notifications\RepairStatusUpdated;

class Repair extends Model
{
    use HasFactory;

    protected $fillable = [
        'collection_id',
        'date',
        'price',
        'revisions',
        'refuse_reason',
        'modify_reason',
        'description',
        'status',
        'proposed_dates'
    ];

    protected $casts = [
        'revisions' => 'array',
        'date' => 'datetime',
        'price' => 'integer',
        'refuse_reason' => 'string',
        'modify_reason' => 'string',
        'status' => 'string',
        'proposed_dates' => 'array'
    ];

    /**
     * Prepare a date for array / JSON serialization.
     */
    protected function serializeDate($date)
    {
        return $date ? $date->setTimezone(new \DateTimeZone('Europe/Paris')) : null;
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    protected static function booted()
    {
        static::created(function ($repair) {
            if ($repair->status === 'asked') {
                $creator = $repair->collection->watch->creator;
                $creator->notify(new RepairStatusUpdated($repair));
            }
        });

        static::updating(function ($repair) {
            if ($repair->isDirty('status')) {
                $user = $repair->collection->user;
                $creator = $repair->collection->watch->creator;

                switch ($repair->status) {
                    case 'asked':
                        $creator->notify(new RepairStatusUpdated($repair));
                        break;
                    case 'pending':
                        $user->notify(new RepairStatusUpdated($repair));
                        break;
                    case 'accepted':
                        $creator->notify(new RepairStatusUpdated($repair));
                        break;
                    case 'completed':
                        $user->notify(new RepairStatusUpdated($repair));
                        break;
                    case 'refused':
                    case 'modified':
                        $user->notify(new RepairStatusUpdated($repair));
                        break;
                    case 'canceled':
                        $creator->notify(new RepairStatusUpdated($repair));
                        break;
                }
            }
        });
    }
}
