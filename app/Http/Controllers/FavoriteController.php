<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Movie;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function store(Request $request, $movieId)
    {
        $request->validate(['user_id' => 'required|exists:users,id']);
        Favorite::create([
            'user_id' => $request->user_id,
            'movie_id' => $movieId
        ]);
        return redirect()->route('movies.show', $movieId);
    }

    public function destroy($movieId)
    {
        $favorite = Favorite::where('movie_id', $movieId)->where('user_id', auth()->id())->first();
        if ($favorite) {
            $favorite->delete();
        }
        return redirect()->route('movies.show', $movieId);
    }
}
