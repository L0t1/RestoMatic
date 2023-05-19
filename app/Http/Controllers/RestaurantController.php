<?php
namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::all();
        return response()->json(['restaurants' => $restaurants]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'address' => 'nullable',
            'city' => 'required',
            'state' => 'required',
            'zipcode' => 'nullable',
            'phone' => 'required',
            'website' => 'nullable',
            'opening_hours' => 'required',
            'cuisine' => 'nullable',
            'price_range' => 'nullable',
            'capacity' => 'required|integer',
        ]);

        $restaurant = new Restaurant();
        // Set the restaurant attributes from the request data
        $restaurant->name = $request->input('name');
        $restaurant->description = $request->input('description');
        $restaurant->address = $request->input('address');
        $restaurant->city = $request->input('city');
        $restaurant->state = $request->input('state');
        $restaurant->zipcode = $request->input('zipcode');
        $restaurant->phone = $request->input('phone');
        $restaurant->website = $request->input('website');
        $restaurant->opening_hours = $request->input('opening_hours');
        $restaurant->cuisine = $request->input('cuisine');
        $restaurant->price_range = $request->input('price_range');
        $restaurant->capacity = $request->input('capacity');
        // Save the restaurant
        $restaurant->save();

        return response()->json([
            'message' => 'Restaurant created successfully',
            'restaurant' => $restaurant,
        ]);
    }

    public function show(Restaurant $restaurant)
    {
        return response()->json(['restaurant' => $restaurant]);
    }

    public function update(Request $request, Restaurant $restaurant)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'address' => 'nullable',
            'city' => 'required',
            'state' => 'required',
            'zipcode' => 'nullable',
            'phone' => 'required',
            'website' => 'nullable',
            'opening_hours' => 'required',
            'cuisine' => 'nullable',
            'price_range' => 'nullable',
            'capacity' => 'required|integer',
        ]);

        // Update the restaurant attributes from the request data
        $restaurant->name = $request->input('name');
        $restaurant->description = $request->input('description');
        $restaurant->address = $request->input('address');
        $restaurant->city = $request->input('city');
        $restaurant->state = $request->input('state');
        $restaurant->zipcode = $request->input('zipcode');
        $restaurant->phone = $request->input('phone');
        $restaurant->website = $request->input('website');
        $restaurant->opening_hours = $request->input('opening_hours');
        $restaurant->cuisine = $request->input('cuisine');
        $restaurant->price_range = $request->input('price_range');
        $restaurant->capacity = $request->input('capacity');
        // Save the changes
        $restaurant->save();

        return response()->json(['message' => 'Restaurant updated successfully']);
    }

    public function destroy(Restaurant $restaurant)
    {
        // Delete the restaurant
        $restaurant->delete();
        return response()->json(['message' => 'Restaurant deleted successfully']);
    }
}
