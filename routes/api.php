<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Retrieve all restaurants
Route::get('/restaurants', [RestaurantController::class, 'index']);

// Create a new restaurant
Route::post('/restaurants', [RestaurantController::class, 'store']);

// Retrieve a specific restaurant
Route::get('/restaurants/{restaurant}', [RestaurantController::class, 'show']);

// Update a restaurant
Route::put('/restaurants/{restaurant}', [RestaurantController::class, 'update']);

// Delete a restaurant
Route::delete('/restaurants/{restaurant}', [RestaurantController::class, 'destroy']);