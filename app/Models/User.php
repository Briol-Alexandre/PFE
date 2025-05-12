<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    public const ROLE_CREATOR = 'creator';
    public const ROLE_USER = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the watches created by this user (only for creators)
     */
    public function createdWatches()
    {
        return $this->hasMany(Watch::class, 'user_id');
    }

    /**
     * Get the watches in the user's collection
     */
    public function collection()
    {
        return $this->hasMany(Collection::class);
    }

    /**
     * Check if the user is a creator
     */
    public function isCreator(): bool
    {
        return strtolower($this->role) === strtolower(self::ROLE_CREATOR);
    }

    /**
     * Check if the user is a normal user
     */
    public function isUser(): bool
    {
        return $this->role === self::ROLE_USER;
    }
}
