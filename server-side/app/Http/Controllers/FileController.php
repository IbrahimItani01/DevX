<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FileController extends Controller
{
    public function store(Request $request)
    {
        // // Validate the request
        // $request->validate([
        //     'file' => 'required|file',
        // ]);

        // // Store the file
        // // $file = $request->file('file');
        // // $path = $file->store('uploads', 'public'); // Store in 'storage/app/public/uploads'

        // // // Get the original file name
        // // $filename = $file->getClientOriginalName();

        // // Save the filename in the database
        // $fileRecord = File::create([
        //     'file_name' => $filename,
        // ]);

        // // Return the response
        // return response()->json([
        //     'message' => 'File uploaded successfully',
        //     'file' => $fileRecord,
        //     'path' => $path,
        // ], 201);
    }
    public function getCollaboratorCount(Request $request){

       $collaboratorCount = DB::table('collaborations')
        ->where('file_id', $request->file_id)
        ->count();

    return response()->json([
        'file_id' => $request->file_id,
        'collaborator_count' => $collaboratorCount,
    ]);
}

}
