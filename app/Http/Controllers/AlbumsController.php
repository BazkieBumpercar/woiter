<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Album;

use App\Utility\StringHelper;


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

        $request['url'] = \App\Utility\StringHelper::createFilename($request['title']);

        $album = Album::create($request->all());
        return response()->json($album, 201);
    }

    public function update(Request $request, Album $album) {
        $album->update($request->all());
        return response()->json($album, 200);
    }

    public function delete(Album $album) {
        $result = DB::table('photos')->get()->where('album_id', $album['id']);
        foreach($result as $photo) {
            $filename = 'photos/' . $album['url'] . '/' . $photo->url;
            if (file_exists($filename)) unlink($filename);
        }
        rmdir('photos/' . $album['url']);

        $album->delete();
        return response()->json(null, 204);
    }

}
