<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtMiddleware;

Route::post('/login', [AuthController::class, 'login']); // Login and generate token

Route::get('/me', [AuthController::class, 'getUser'])->middleware('auth.jwt'); // Get authenticated user

Route::get('/debug-token', function (\Illuminate\Http\Request $request) {
    return response()->json([
        'authorization_header' => $request->header('Authorization'),
        'token' => \Tymon\JWTAuth\Facades\JWTAuth::getToken(),
    ]);
});

Route::group(['middleware' => [JwtMiddleware::class]], function () {
    Route::get('/user', function () {
        // This route is protected by JWT Middleware
        return response()->json(['message' => 'You are authorized!']);
    });

    Route::get('/profile', function () {
        // Another protected route
        return response()->json(['message' => 'This is your profile!']);
    });
});

Route::post('/send-invite', [EmailController::class, 'sendEmail']);

Route::post('login', [AuthController::class, 'login']);
