<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Repair;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Revisions extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
    ];

    public function repairs(): BelongsTo
    {
        return $this->belongsTo(Repair::class);
    }
}
