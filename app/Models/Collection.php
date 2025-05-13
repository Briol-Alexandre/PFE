<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collection extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'watch_id',
        'purchase_date',
        'warranty_end_date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function watch(): BelongsTo
    {
        return $this->belongsTo(Watch::class);
    }
}
