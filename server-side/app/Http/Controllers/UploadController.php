<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class UploadController extends Controller
{

    public function upload(Request $request){
    $validated = $request->validate([
        'file_name' => 'required|string',
        'file_content' => 'required|string',
        'file_language' => 'required|string',
    ]);

    $fileName = $validated['file_name'];
    $fileContent = $validated['file_content'];
    $file_language = $validated['file_language'];

    $filePath = 'uploads/' . $fileName;

    if (Storage::disk('public')->exists($filePath)) {
        Storage::disk('public')->put($filePath, $fileContent);

        DB::table('files')
            ->where('file_name', $fileName)
            ->update([
                'file_path' => $filePath,
                'file_language' => $file_language,
            ]);

        $message = 'File updated successfully.';
    } else {
        Storage::disk('public')->put($filePath, $fileContent);

        DB::table('files')->insert([
            'file_path' => $filePath,
            'file_name' => $fileName,
            'file_language' => $file_language,
            'owner_id' => 1,
        ]);

        $message = 'File created successfully.';
    }

    return response()->json([
        'message' => $message,
        'filePath' => $filePath,
    ], 200);
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
