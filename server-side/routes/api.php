<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JwtController;
use App\Http\Controllers\FileController;

Route::post('/send-invite', [EmailController::class, 'sendEmail']);

Route::post('/decode-token', [JwtController::class, 'decodeToken']);
Route::post('/login', [JwtController::class, 'login']);
Route::post('/register', [JwtController::class, 'register']);

Route::post('/upload', [FileController::class, 'store']);
Route::post('/test', [FileController::class, 'getCollaboratorCount']);
Route::post('/test1', [FileController::class, 'addCollaborator']);
Route::post('/test2', [FileController::class, 'getFiles']);
Route::post('/test3', [FileController::class, 'getUser']);
