<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Movie;
use Illuminate\Http\Request;
use Exception;

class FavoriteController extends Controller
{
    // Add a movie to favorites
    public function store(Request $request, $movieId)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);

            // Check if the movie exists before adding to favorites
            $movie = Movie::find($movieId);
            if (!$movie) {
                return response()->json(['message' => 'Movie not found.'], 404); // Movie not found
            }

            $favorite = Favorite::firstOrCreate([
                'user_id' => $validated['user_id'],
                'movie_id' => $movieId,
            ]);

            return response()->json([
                'message' => 'Movie added to favorites successfully.',
                'data' => $favorite
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while adding the movie to favorites.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }

    // Remove a movie from favorites
    public function destroy(Request $request, $movieId)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);

            $favorite = Favorite::where('movie_id', $movieId)
                ->where('user_id', $validated['user_id'])
                ->first();

            if (!$favorite) {
                return response()->json(['message' => 'Favorite not found.'], 404); // Not Found
            }

            $favorite->delete();

            return response()->json(['message' => 'Movie removed from favorites successfully.'], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while removing the movie from favorites.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }
}
