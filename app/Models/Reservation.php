<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_date',
        'reservation_time',
        'guest_name',
        'guest_email',
        'guest_phone',
        'party_size',
        'special_requests',
        'status',
        'user_id',
        // 'restaurant_id'
    ];

    protected $dates = [
        'reservation_date',
        'reservation_time',
    ];

    // Relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with Restaurant model
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
