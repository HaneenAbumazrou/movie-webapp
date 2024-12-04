<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Movie;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    // Add a movie to favorites
    public function store(Request $request, $movieId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id' => $validated['user_id'],
            'movie_id' => $movieId,
        ]);

        return response()->json([
            'message' => 'Movie added to favorites successfully.',
            'data' => $favorite
        ], 201);
    }

    // Remove a movie from favorites
    public function destroy(Request $request, $movieId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $favorite = Favorite::where('movie_id', $movieId)
            ->where('user_id', $validated['user_id'])
            ->first();

        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found.'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Movie removed from favorites successfully.'], 200);
    }
}
