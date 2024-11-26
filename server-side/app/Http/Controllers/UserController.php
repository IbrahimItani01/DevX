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

    $user = DB::table('users')
                ->select('name', 'email')
                ->where('id', '=', $user->id)
                ->get();
    return response()->json(['user' => $user], 200);
    }

}
