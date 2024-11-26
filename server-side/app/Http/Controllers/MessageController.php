<?php

namespace App\Http\Controllers;

use App\Events\CodeEditEvent;
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
        broadcast(new CodeEditEvent($userId, $documentId, $content, $cursorPosition));

        // Optional: Persist the document state in the database
        // $document = Document::find($documentId);
        // $document->content = $content;
        // $document->save();

        return response()->json(['success' => true]);
    }
}

