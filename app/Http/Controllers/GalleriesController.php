<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Gallery;

class GalleriesController extends Controller
{

    public function index() {
        return Gallery::all();
    }

    public function show(Gallery $gallery) {
        return $gallery;
    }

    public function store(Request $request) {
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'max:255',
            'published' => 'boolean'
        ]);
        $gallery = Gallery::create($request->all());
        return response()->json($gallery, 201);
    }

    public function update(Request $request, Gallery $gallery) {
        $gallery->update($request->all());
        return response()->json($gallery, 200);
    }

    public function delete(Gallery $gallery) {
        $gallery->delete();
        return response()->json(null, 204);
    }

}
