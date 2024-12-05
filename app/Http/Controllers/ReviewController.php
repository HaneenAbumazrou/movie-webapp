<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use App\Models\Movie;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Retrieve all reviews
    public function index()
    {
        $reviews = Review::with(['user', 'movie'])->get();
        return response()->json($reviews, 200);
    }

    // Retrieve a single review by ID
    public function show($id)
    {
        $review = Review::with(['user', 'movie'])->find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found.'], 404);
        }

        return response()->json($review, 200);
    }

    // Show the form for creating a new review
    public function create(Request $request)
    {
        // Simulate creating a review (e.g., return a view for form in Blade)
        return response()->json(['message' => 'Display the create review form.'], 200);
    }

    // Store a new review
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required|exists:movies,id',
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $review = Review::create($validated);

        return response()->json([
            'message' => 'Review created successfully.',
            'data' => $review,
        ], 201);
    }

    // Show the form for editing an existing review
    public function edit($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found.'], 404);
        }

        // Simulate editing a review (e.g., return a view for form in Blade)
        return response()->json([
            'message' => 'Display the edit review form.',
            'data' => $review,
        ], 200);
    }

    // Update an existing review
    public function update(Request $request, $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found.'], 404);
        }

        $validated = $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Review updated successfully.',
            'data' => $review,
        ], 200);
    }

    // Delete a review by ID
    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found.'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.'], 200);
    }
}
