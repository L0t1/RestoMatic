<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(15)->create();
        \App\Models\Restaurant::factory(30)->create();
        \App\Models\Reservation::factory(30)->create();


        \App\Models\User::factory()->create([
            'name' => 'Loti',
            'email' => 'loti@test.com',
            'password' => Hash::make('1234'),
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Besar',
            'email' => 'besar@test.com',
            'password' => Hash::make('1234'),
        ]);
    }
}
