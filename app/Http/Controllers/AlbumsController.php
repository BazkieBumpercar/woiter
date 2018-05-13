<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Album;

class AlbumsController extends Controller
{

    public function index() {
        return Album::all();
    }

    public function show(Album $album) {
        return $album;
    }

    public function store(Request $request) {
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'max:255',
            'published' => 'boolean'
        ]);
        $album = Album::create($request->all());
        return response()->json($album, 201);
    }

    public function update(Request $request, Album $album) {
        $album->update($request->all());
        return response()->json($album, 200);
    }

    public function delete(Album $album) {
        $album->delete();
        return response()->json(null, 204);
    }

}
