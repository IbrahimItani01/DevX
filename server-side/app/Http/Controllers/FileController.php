<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class FileController extends Controller
{
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

    public function addCollaborator(Request $request)
    {
        $user_id = $this->getAuthenticatedUserId()->id;
        if (!$user_id) {
            return response()->json(['error' => 'Invalid or missing token'], 401);
        }

        $validatedData = $request->validate([
            //  'collaborator_id' => 'required|integer',
            'file_id' => 'required|integer',
            'privilege' => 'required|string',
        ]);

        DB::table('collaborations')->insert([
            'collaborator_id' => $user_id,
            'file_id' => $validatedData['file_id'],
            'privilege' => $validatedData['privilege'],
        ]);

        return response()->json(['message' => 'Collaborator added successfully.'], 201);
    }

    public function getCollaboratorCount(Request $request)
    {
        $validatedData = $request->validate([
            'file_id' => 'required|integer',
        ]);

        $collaboratorCount = DB::table('collaborations')
            ->where('file_id', $validatedData['file_id'])
            ->count();

        return response()->json([
            'file_id' => $validatedData['file_id'],
            'collaborator_count' => $collaboratorCount,
        ]);
    }

}
