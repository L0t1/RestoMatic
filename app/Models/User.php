<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

     // Define the role constants
     public const ROLE_NORMAL = 'normal';
     public const ROLE_OWNER = 'owner';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relationship with Reservation model (User has many Reservations)
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    // Relationship with Restaurant model (User can own a Restaurant)
    public function restaurant()
    {
        return $this->hasOne(Restaurant::class, 'owner_id');
    }

    // Check if the user has the 'normal' role
    public function isNormalUser()
    {
        return $this->role === self::ROLE_NORMAL;
    }

    // Check if the user has the 'owner' role
    public function isOwnerUser()
    {
        return $this->role === self::ROLE_OWNER;
    }
}
