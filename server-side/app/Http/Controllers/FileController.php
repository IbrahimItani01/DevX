<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

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
    // public function getUser()
    // {
    //     try {
    //       if (! $user = JWTAuth::parseToken()->authenticate()) {
    //             return response()->json(['error' => 'User not found'], 404);
    //         }

    //     } catch (JWTException $e) {
    //         return response()->json(['error' => 'Invalid token'], 400);
    //     }

    //     return response()->json([
    //         'user' => $user,
    //     ]);
    // }
    public function getAuthenticatedUserId(){
    try {
        $user = JWTAuth::parseToken()->authenticate();
        return $user->id; // Return the user ID
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return null; // Handle token errors gracefully
    }
    }


    public function getFiles(){

    $user_id = $this->getAuthenticatedUserId(); // Retrieve user ID from token
    if (!$user_id) {
        return response()->json(['error' => 'Invalid or missing token'], 401);
    }

    $owner_files = DB::table('files')
        ->where('owner_id', $user_id)
        ->get();

    $collaborater_files = DB::table('collaborations')
        ->join('files', 'collaborations.file_id', '=', 'files.id')
        ->where('collaborations.collaborater_id', $user_id)
        ->select('files.*')
        ->get();

    return response()->json([
        "owner_files" => $owner_files,
        "collaborater_files" => $collaborater_files,
    ]);
    }

    public function addCollaborator(Request $request){
        DB::table('collaborations')->insert([
            'collaborater_id' => $request->collaborater_id,
            'file_id' => $request->file_id,
            'privilige'=> $request->privilege,
        ]);
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
