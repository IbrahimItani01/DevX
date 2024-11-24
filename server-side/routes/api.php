<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JwtController;

Route::post('/send-invite', [EmailController::class, 'sendEmail']);

Route::post('/decode-token', [JwtController::class, 'decodeToken']);
Route::post('/login', [JwtController::class, 'login']);
Route::post('/register', [JwtController::class, 'register']);
use App\Http\Controllers\FileController;

Route::post('/upload', [FileController::class, 'store']);
