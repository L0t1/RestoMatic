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
            'reservation_date' => $dateTime->format('Y-m-d'),
            'reservation_time' => $dateTime->format('H:i:s'),
            'guest_name' => fake()->name(),
            'guest_email' => fake()->email(),
            'guest_phone' => fake()->phoneNumber(),
            'party_size' => fake()->numberBetween(1, 10),
            'special_requests' => fake()->sentence(),
            'status' => fake()->randomElement(['confirmed', 'canceled', 'pending']),
            'user_id' => function () {
                return User::inRandomOrder()->first()->id;
                },
            'restaurant_id' => function () {
                return Restaurant::inRandomOrder()->first()->id;
                },
        ];
    }
}
