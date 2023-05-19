<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'description' => fake()->sentence(),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'zipcode' => fake()->postcode(),
            'phone' => fake()->phoneNumber(),
            'website' => fake()->url(),
            'opening_hours' => fake()->randomElement(['9am-5pm', '11am-10pm', '24 hours']),
            'cuisine' => fake()->randomElement(['Italian', 'Mexican', 'Chinese', 'Indian']),
            'price_range' => fake()->randomElement(['Affordable', 'Moderate', 'Expensive']),
            'capacity' => fake()->numberBetween(20, 100),
            'user_id' => function () {
                return User::inRandomOrder()->where('role', 'owner')->first()->id;
      }];
    }
}
