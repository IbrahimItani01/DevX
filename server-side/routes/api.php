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


Route::get('/test-event', function () {
    event(new App\Events\RealTimeMessageEvent(1, 123, 'Hello from test route!', ['line' => 3, 'ch' => 5]));
    return 'Event dispatched!';
});

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

Route::post('/get-count', [FileController::class, 'getCollaboratorCount']); // this can expect the file id in the param if needed
Route::post('/create-collab', [FileController::class, 'addCollaborator']);
Route::get('/get-files', [FileController::class, 'getFiles']);

Route::post('/upload', [UploadController::class, 'upload']);
Route::post('/getFileContent', [UploadController::class, 'getFileContent']);

Route::get('/getUser', [UserController::class, 'getUser']);
Route::post('/getUserPrivilege', [UserController::class, 'getUserPrivilege']);
