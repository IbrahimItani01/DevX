<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // Register API
    public function register(Request $request)
    {
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);
            try{
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);

            }catch(\Exception $e){
                return response()->json([
                    'message' => 'User already exists',
                ], 400);
            }
    
            $token = JWTAuth::fromUser($user);
    
            return response()->json([
                'message' => 'User registered successfully!',
                'token' => $token,
            ], 201);

        }catch  (\Exception $e){
            return response()->json([
                'message' => 'Are you a robot?',
            ], 400);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        // Use JWTAuth explicitly to generate the token
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Return the token along with a success message
        return response()->json([
            'message' => 'Login successful!',
            'token' => $token,
        ], 200);
    }
}