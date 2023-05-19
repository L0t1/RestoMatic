<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();
        return response()->json(['reservations' => $reservations]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'restaurant_id' => 'required',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required',
            'guest_name' => 'required',
            'guest_email' => 'required|email',
            'guest_phone' => 'required',
            'party_size' => 'required|integer',
            'special_requests' => 'nullable',
            'status' => 'nullable',
        ]);

        $reservation = new Reservation();
        $reservation->user_id = $request->input('user_id');
        $reservation->restaurant_id = $request->input('restaurant_id');
        $reservation->reservation_date = $request->input('reservation_date');
        $reservation->reservation_time = $request->input('reservation_time');
        $reservation->guest_name = $request->input('guest_name');
        $reservation->guest_email = $request->input('guest_email');
        $reservation->guest_phone = $request->input('guest_phone');
        $reservation->party_size = $request->input('party_size');
        $reservation->special_requests = $request->input('special_requests');
        $reservation->status = $request->input('status', 'pending');
        $reservation->save();

        return response()->json([
            'message' => 'Reservation created successfully',
            'reservation' => $reservation,
        ]);
    }

    public function show(Reservation $reservation)
    {
        return response()->json(['reservation' => $reservation]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $request->validate([
            'user_id' => 'required',
            'restaurant_id' => 'required',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required',
            'guest_name' => 'required',
            'guest_email' => 'required|email',
            'guest_phone' => 'required',
            'party_size' => 'required|integer',
            'special_requests' => 'nullable',
            'status' => 'nullable',
        ]);

        $reservation->user_id = $request->input('user_id');
        $reservation->restaurant_id = $request->input('restaurant_id');
        $reservation->reservation_date = $request->input('reservation_date');
        $reservation->reservation_time = $request->input('reservation_time');
        $reservation->guest_name = $request->input('guest_name');
        $reservation->guest_email = $request->input('guest_email');
        $reservation->guest_phone = $request->input('guest_phone');
        $reservation->party_size = $request->input('party_size');
        $reservation->special_requests = $request->input('special_requests');
        $reservation->status = $request->input('status', 'pending');
        $reservation->save();

        return response()->json(['message' => 'Reservation updated successfully']);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
