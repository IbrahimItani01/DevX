<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function getUser(){

    $user = JWTAuth::parseToken()->authenticate();

    if (!$user) {
        return response()->json(['error' => 'Invalid or missing token'], 401);
    }

    $query = DB::table('users')
    ->select('name', 'email')
    ->where('id', '=', $user->id)
    ->first();

    if ($query) {
        return response()->json([
            'name' => $query->name,
            'email' => $query->email,
        ], 200);
    } else {
        return response()->json([
            'error' => 'User not found',
        ], 404);
    }}
    public function getUserPrivilege(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json(['error' => 'Invalid or missing token'], 401);
        }

        $user_id = $user->id;

        $validatedData = $request->validate([
        'file_id' => 'required|integer',
        ]);

        $query = DB::table('collaborations')
        ->select('privilege')
        ->where('file_id', '=', $validatedData['file_id'])
        ->where('collaborator_id', '=', $user_id )
        ->get();

        if ($query->isEmpty()) {
            return response()->json(['message' => 'No privilege found'], 404);
        }
        return response()->json(['privilege' => $query], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error getting privilege', 'error' => $e->getMessage()], 400);
        }
    }

}
