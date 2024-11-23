<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;

Route::post('/send-invite', [EmailController::class, 'sendEmail']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');