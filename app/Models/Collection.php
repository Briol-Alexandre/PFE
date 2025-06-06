<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collection extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'watch_id',
        'purchase_date',
        'warranty_end_date',
        'warranty_image',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function watch(): BelongsTo
    {
        return $this->belongsTo(Watch::class);
    }

    public function repairs(): HasMany
    {
        return $this->hasMany(Repair::class);
    }
}
