<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Watch extends Model
{
    use HasFactory;

    protected $fillable = [
        'model',
        'movement',
        'image',
        'user_id',
    ];

    protected $with = ['creator'];



    /**
     * Get the creator of this watch
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the users who have this watch in their collection
     */
    public function collectors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'collections');
    }
}
