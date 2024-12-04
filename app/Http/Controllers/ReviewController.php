<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Movie;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $movieId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        Review::create([
            'user_id' => $request->user_id,
            'movie_id' => $movieId,
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        return redirect()->route('movies.show', $movieId);
    }

    public function destroy($movieId, $reviewId)
    {
        $review = Review::where('movie_id', $movieId)->where('id', $reviewId)->first();
        if ($review) {
            $review->delete();
        }
        return redirect()->route('movies.show', $movieId);
    }
}
