<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Category;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    // Retrieve all movies
    public function index()
    {
        $movies = Movie::with('category')->get();
        return response()->json($movies, 200);
    }

    // Retrieve a single movie by ID
    public function show($id)
    {
        $movie = Movie::with('category')->find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        return response()->json($movie, 200);
    }

    // Store a new movie
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'genre' => 'required|string|max:100',
            'description' => 'required|string',
            'release_date' => 'required|date',
            'rating' => 'required|numeric|between:0,10',
            'poster_url' => 'required|string',
        ]);

        $movie = Movie::create($validated);

        return response()->json([
            'message' => 'Movie created successfully.',
            'data' => $movie,
        ], 201);
    }

    // Update an existing movie
    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'genre' => 'required|string|max:100',
            'description' => 'required|string',
            'release_date' => 'required|date',
            'rating' => 'required|numeric|between:0,10',
            'poster_url' => 'required|string',
        ]);

        $movie->update($validated);

        return response()->json([
            'message' => 'Movie updated successfully.',
            'data' => $movie,
        ], 200);
    }

    // Delete a movie by ID
    public function destroy($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        $movie->delete();

        return response()->json(['message' => 'Movie deleted successfully.'], 200);
    }

    // Add this method to your MovieController
     public function search(Request $request)
     
    {
    $query = Movie::with('category');

    // Search by title (case-insensitive)
    if ($request->has('title')) {
        $query->where('title', 'LIKE', '%' . $request->input('title') . '%');
    }

    // Filter by genre
    if ($request->has('genre')) {
        $query->where('genre', $request->input('genre'));
    }

    // Filter by category
    if ($request->has('category_id')) {
        $query->where('category_id', $request->input('category_id'));
    }

    // Filter by minimum rating
    if ($request->has('min_rating')) {
        $query->where('rating', '>=', $request->input('min_rating'));
    }

    // Filter by release date range
    if ($request->has('start_date') && $request->has('end_date')) {
        $query->whereBetween('release_date', [
            $request->input('start_date'), 
            $request->input('end_date')
        ]);
    }

    // Paginate results
    $movies = $query->paginate(10);
    return $movies;
}
}
