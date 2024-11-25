<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class UploadController extends Controller
{

    public function upload(Request $request)
    {
        try {
            // Get the authenticated user
            $user = JWTAuth::parseToken()->authenticate();

            // If the user is not authenticated, return an error response
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Validate the incoming request data
            $validated = $request->validate([
                'file_name' => 'required|string',
                'file_content' => 'required|string',
                'file_language' => 'required|string',
            ]);

            // Extract the validated data
            $fileName = $validated['file_name'];
            $fileContent = $validated['file_content'];
            $file_language = $validated['file_language'];

            $filePath = 'uploads/' . $fileName;

            // Check if the file exists in the storage
            if (Storage::disk('public')->exists($filePath)) {
                // Update the file content
                Storage::disk('public')->put($filePath, $fileContent);

                // Update the file record in the database
                DB::table('files')
                    ->where('file_name', $fileName)
                    ->update([
                        'file_path' => $filePath,
                        'file_language' => $file_language,
                    ]);

                $message = 'File updated successfully.';
            } else {
                // Store the new file in the storage
                Storage::disk('public')->put($filePath, $fileContent);

                // Insert the new file record into the database
                DB::table('files')->insert([
                    'file_path' => $filePath,
                    'file_name' => $fileName,
                    'file_language' => $file_language,
                    'owner_id' => $user->id,  // Use the user ID here
                ]);

                $message = 'File created successfully.';
            }

            return response()->json([
                'message' => $message,
                'filePath' => $filePath,
            ], 200);

        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token invalid or expired'], 401);
        }
    }

    public function getFileContent(Request $request)
    {
    $validated = $request->validate([
    'file_name' => 'required|string',
    ]);

    $file_name = $validated['file_name'];

    $file_path = 'uploads/' . $file_name;

    if (Storage::disk('public')->exists($file_path)) {
        $content = Storage::disk('public')->get($file_path);

        return response()->json([
            'content' => $content,
        ]);
    } else {
        return response()->json(['error' => 'File not found'], 404);
    }
    }

}
