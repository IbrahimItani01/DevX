<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\MessageController;

Route::get('/test-event', function () {
    event(new App\Events\RealTimeMessageEvent(1, 123, 'Hello from test route!', ['line' => 3, 'ch' => 5]));
    return 'Event dispatched!';
});

Route::post('/send-message', [MessageController::class, 'sendMessage']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware(['jwt'])->group(function () {
    Route::get('/protected-route', function () {
        return response()->json(['message' => 'You are authorized'], 200);
    });
});
    


Route::post('/send-invite', [EmailController::class, 'sendEmail']);

