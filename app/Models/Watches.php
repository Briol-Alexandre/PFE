<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Watches extends Model
{
    protected $fillable = [
        'model',
        'purchase_date',
        'movement',
        'image',
        'user_id',
        'waranty_end_date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function repairs(): HasMany
    {
        return $this->hasMany(Repairs::class);
    }
}
