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
            'userId' => $user->id,
        ], 200);
    } else {
        return response()->json([
            'error' => 'User not found',
        ], 404);
    }}

}
