<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class UploadController extends Controller
{

    public function upload(Request $request)
    {
        $validated = $request->validate([
            'fileName' => 'required|string',
            'fileContent' => 'required|string',
            'file_language' => 'required|string',
        ]);

        $fileName = $validated['fileName'];
        $fileContent = $validated['fileContent'];
        $file_language = $validated['file_language'];

        $filePath = 'uploads/' . $fileName;

        Storage::disk('public')->put($filePath, $fileContent);

        $savedFile = DB::table('files')->insert([
            'file_path' => $filePath,
            'file_name' => $fileName,
            'file_language'=>$file_language,
            'owner_id' => 1,
            // 'created_at' => now(),
            // 'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'File uploaded successfully.',
            'fileId' => $savedFile,
            'filePath' => $filePath,
        ], 201);
    }

}
