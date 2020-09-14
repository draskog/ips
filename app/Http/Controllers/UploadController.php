<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
use Str;

class UploadController extends Controller {

    public function store(Request $request)
    {
        $filename = Str::uuid() . '.png';
        $data = explode(',', $request->input('imageBase64'));
        $content = base64_decode($data[1]);
        Storage::disk('public')->put($filename, $content);

        return $filename;
    }

    public function destroy($filename)
    {
        return Storage::disk('public')->delete($filename);
    }
}
