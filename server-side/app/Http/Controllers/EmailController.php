<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        // Validate the request
        $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        // Extract details from the request
        $to = $request->input('to');
        $subject = $request->input('subject');
        $messageBody = $request->input('message');

        // Send the email
        Mail::raw($messageBody, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
