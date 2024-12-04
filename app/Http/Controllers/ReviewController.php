<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Movie;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Store a new review for a movie
    public function store(Request $request, $movieId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $review = Review::create([
            'user_id' => $validated['user_id'],
            'movie_id' => $movieId,
            'rating' => $validated['rating'],
            'review' => $validated['review'],
        ]);

        return response()->json([
            'message' => 'Review created successfully.',
            'data' => $review,
        ], 201);
    }

    // Delete a review by movie ID and review ID
    public function destroy($movieId, $reviewId)
    {
        $review = Review::where('movie_id', $movieId)->where('id', $reviewId)->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found.'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.'], 200);
    }
}
