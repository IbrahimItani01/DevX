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
    public function getUserPrivilege(Request $request){

        $user_id = JWTAuth::parseToken()->authenticate()->id;

        if (!$user) {
            return response()->json(['error' => 'Invalid or missing token'], 401);
        }
        $validatedData = $request->validate([
            'file_id' => 'required|integer',
        ]);

        $query = DB::table('collaborations')
        ->select('privilige')
        ->where('file_id', '=',$validatedData['file_id'])
        ->where('collaborator_id', '=',$user_id)
        ->first();
    }
}
