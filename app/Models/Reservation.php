<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $guarded = [];

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
