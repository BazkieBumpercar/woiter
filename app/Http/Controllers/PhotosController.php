<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use App\Photo;
use App\Album;

class PhotosController extends Controller {

    public function index() {
        return Photo::all();
    }

    public function show(Photo $photo) {
        return $photo;
    }

    public function getByAlbumId(Album $album) {
        $result = DB::table('photos')->orderBy('id')->get()->where('album_id', $album['id']);
        $photos = array();
        foreach($result as $photo) {
            $photos[] = $photo;
        }
        return $photos;
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
