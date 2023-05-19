<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $table = 'restaurants';



    // Relationship with Reservation model (Restaurant has many Reservations)
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    // Relationship with User model (Restaurant belongs to an Owner/User)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
