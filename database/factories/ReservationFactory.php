<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dateTime = Carbon::now()->addDays(fake()->numberBetween(1, 30));
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'restaurant_id' => Restaurant::inRandomOrder()->first()->id,
            'datetime' => $dateTime,
            'party_size' => fake()->numberBetween(1, 10),
        // Add other reservation attributes
        ];
    }
}
