<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    // User login to issue a token
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            // Attempt to create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // Return the generated token
        return response()->json(['token' => $token]);
    }


public function getUser()
{
    try {
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Token is invalid or expired'], 401);
    }
}
}
