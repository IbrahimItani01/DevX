<?php

namespace App\Http\Controllers;

use App\Events\RealTimeMessageEvent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function updateDocument(Request $request)
    {
        $userId = $request->input('userId');
        $documentId = $request->input('documentId');
        $content = $request->input('content');
        $cursorPosition = $request->input('cursorPosition');

        // Broadcast changes to other users
        broadcast(new RealTimeMessageEvent($userId, $documentId, $content, $cursorPosition));

        return response()->json(['success' => true]);
    }
}

