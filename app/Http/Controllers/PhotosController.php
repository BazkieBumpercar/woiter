<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Photo;

class PhotosController extends Controller
{

    public function index() {
        return Photo::all();
    }

    public function show(Photo $photo) {
        return $photo;
    }
    
    public function store(Request $request) {
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'max:255',
            'location' => 'max:255',
            'published' => 'boolean'
        ]);
        $photo = Photo::create($request->all());
        return response()->json($photo, 201);
    }

    public function update(Request $request, Photo $photo) {
        $photo->update($request->all());
        return response()->json($photo, 200);
    }

    public function delete(Photo $photo) {
        $photo->delete();
        return response()->json(null, 204);
    }

}
