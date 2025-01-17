<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UploadController;

use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;

Route::post('/update-document', [MessageController::class, 'updateDocument']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware(['jwt'])->group(function () {
    Route::get('/protected-route', function () {
        return response()->json(['message' => 'You are authorized'], 200);
    });
});

Route::post('/send-invite', [EmailController::class, 'sendEmail']);
Route::post('/get-count', [FileController::class, 'getCollaboratorCount']);
Route::post('/create-collab', [FileController::class, 'addCollaborator']);
Route::get('/get-files', [FileController::class, 'getFiles']);
Route::post('/upload', [UploadController::class, 'upload']);
Route::post('/getFileContent', [UploadController::class, 'getFileContent']);
Route::get('/getUser', [UserController::class, 'getUser']);
