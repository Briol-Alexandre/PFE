<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Repairs extends Model
{
    protected $fillable = [
        'watch_id',
        'revision_id',
    ];

    public function watch(): BelongsTo
    {
        return $this->belongsTo(Watches::class);
    }

    public function revision(): BelongsTo
    {
        return $this->belongsTo(Revisions::class);
    }
}
