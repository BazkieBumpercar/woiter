<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

//use Intervention\Image\ImageManager;
use Intervention\Image\ImageManagerStatic as Image;

use App\Utility\StringHelper;

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
            'album_id' => 'required',
            'description' => 'max:255',
            'location' => 'max:255',
            'published' => 'boolean'
        ]);

        // generate random filename
        if (!isset($request['url'])) $request['url'] = \App\Utility\StringHelper::createFilename($request['title'] . "_" . base64_encode(random_bytes(4)));

        $photo = Photo::create($request->all());

        return response()->json($photo, 201);
    }

    public function store_imagedata(Request $request) {
        $this->validate($request, [
            'imagedata' => 'required'//|image|mimes:jpeg,jpg,png,gif'
        ]);
        $image = Image::make($request['imagedata']);

        if (!file_exists('photos')) {
            mkdir('photos', 0777, true);
        }

        $directory = $request['directory'];
        if (!file_exists('photos/' . $directory)) {
            mkdir('photos/' . $directory, 0777, true);
        }

        $filename = $request['filename'];
        $image->fit(300)->save('photos/' . $directory . '/' . $filename);

        return response()->json(null, 201);
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
