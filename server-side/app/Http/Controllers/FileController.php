<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{

//     public function createFile()
//     {
//         Storage::disk('local')->put('./example.txt', 'This is the file content.');


// $content = Storage::disk('local')->get('./example.txt');
// echo $content; // Outputs: This is the file content.

//         return response()->json(['message' => 'File created successfully!']);
//     }

    public function getAuthenticatedUserId(){
    try {
        $user = JWTAuth::parseToken()->authenticate();
        return $user;

    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return null;
    }
    }


    public function getFiles(){

    $user_id = $this->getAuthenticatedUserId()->id;

    if (!$user_id) {
        return response()->json(['error' => 'Invalid or missing token'], 401);
    }

    $owner_files = DB::table('files')
    ->where('owner_id', '=', $user_id)
    ->select(DB::raw('files.*, "owner" as privilege')) // Add privilege column with value "owner"
    ->get();

    $collaborator_files = DB::table('collaborations')
        ->join('files', 'collaborations.file_id', '=', 'files.id')
        ->where('collaborations.collaborator_id', $user_id)
        ->select('files.*','collaborations.privilege')
        ->get();
    return response()->json([
        "owner_files" => $owner_files,
        "collaborator_files" => $collaborator_files,
    ]);
    }

    public function addCollaborator(Request $request){
        DB::table('collaborations')->insert([
            'collaborator_id' => $request->collaborator_id,
            'file_id' => $request->file_id,
            'privilege'=> $request->privilege,
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
