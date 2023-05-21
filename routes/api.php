<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ReservationController;

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


// Retrieve all reservations
Route::get('/reservations', [ReservationController::class, 'index']);
// Create a new reservation
Route::post('/reservations', [ReservationController::class, 'store']);
// Retrieve a specific reservation
Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
// Update a reservation
Route::put('/reservations/{reservation}', [ReservationController::class, 'update']);
// Delete a reservation
Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);

//Status
Route::put('/reservations/{reservation}/update-status', [ReservationController::class, 'updateStatus']);

