<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revisions extends Model
{
    protected $fillable = [
        'type',
    ];

    public function repairs(): BelongsTo
    {
        return $this->belongsTo(Repairs::class);
    }
}
