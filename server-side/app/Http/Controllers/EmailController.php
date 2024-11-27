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
            'email' => 'required|email',
            'file_id' => 'required|integer',
            'role' => 'required|string',
            'user_email'=>'required|string'
        ]);

        // Extract details from the request
        $receiverEmail = $request->input('email');
        $senderEmail = $request->input('user_email');
        $role = $request->input('role');
        $fileId = $request->input(key: 'file_id');
        $subject = "You are Invited to collaborate on a DevX File!";
        $messageBody = "Hello owner of this email!\nYou have been invited by a DevX'er of email : $senderEmail \nTo collaborate on his/her file.\nClick on the link below to visit the invite page:\n'http://localhost:3000/invite/$fileId/$role'";

        // Send the email
        Mail::raw($messageBody, function ($message) use ($receiverEmail,$subject) {
            $message->to($receiverEmail)
                    ->subject($subject);
        });

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
