<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Get all users
    public function index()
    {
        $users = User::all();
        return response()->json([
            'message' => 'Users retrieved successfully.',
            'data' => $users,
        ], 200);
    }

    // Get a single user by ID
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        return response()->json([
            'message' => 'User retrieved successfully.',
            'data' => $user,
        ], 200);
    }

    // Delete a user by ID
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.'], 200);
    }
}
