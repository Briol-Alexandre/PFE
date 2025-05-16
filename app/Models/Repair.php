<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Revisions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Collection;

class Repair extends Model
{
    use HasFactory;

    protected $fillable = [
        'collection_id',
        'date',
        'price',
        'revisions',
        'refuse_reason',
        'description',
        'status'
    ];

    protected $casts = [
        'revisions' => 'array',
        'date' => 'datetime',
        'price' => 'integer',
        'refuse_reason' => 'string',
        'status' => 'string'
    ];

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }
}
