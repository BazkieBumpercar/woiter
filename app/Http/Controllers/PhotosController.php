<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

//use Intervention\Image\ImageManager;
use Intervention\Image\ImageManagerStatic as Image;

use App\Utility\StringHelper;
use App\Utility\PhotoHelper;
use App\Utility\AuthHelper;

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

    public function getThumbnailsByAlbumId(Album $album) {
        //$result = DB::table('photos')->orderBy('id')->get('filename')->where('album_id', $album['id']);
        $photos = Photo::where('album_id', '=', $album['id'])->get();
        $thumbnails = [];
        foreach($photos as $photo) {
            $thumbnails[] = PhotoHelper::smallifyUri($photo->url);
        }
        return $thumbnails;
    }

    public function store(Request $request) {
        
        if ($request->header('authcode') != AuthHelper::getAuthCode()) return response()->json(null, 500);

        $this->validate($request, [
            'title' => 'required|max:255',
            'album_id' => 'required',
            'description' => 'max:255',
            'location' => 'max:255',
            'published' => 'boolean'
        ]);

        // generate random filename
        if (!isset($request['url'])) $request['url'] = StringHelper::createFilename($request['title'] . "_" . base64_encode(random_bytes(4)));

        $photo = Photo::create($request->all());

        return response()->json($photo, 201);
    }

    public function store_imagedata(Request $request) {

        if ($request->header('authcode') != AuthHelper::getAuthCode()) return response()->json(null, 500);

        $this->validate($request, [
            'imagedata' => 'required|mimes:jpeg,jpg,png,gif,tiff,tga,avi,mpeg,mpg,mp4|max:20000'
        ]);
        $image = Image::make($request['imagedata']);

        if (!file_exists('photos')) {
            if (!mkdir('photos', 0777, true)) return response()->json("could not create photos directory", 500);
        }

        $directory = $request['directory'];
        if (!file_exists('photos/' . $directory)) {
            if (!mkdir('photos/' . $directory, 0777, true)) return response()->json("could not create photos/" . $directory . " directory", 500);
        }

        $filename = $request['filename'];
        $uri = 'photos/' . $directory . '/' . $filename;
        $image->save($uri);
        // $image_thumb = Image::cache(function($image) {
        //     $image->make('photos/' . $directory . '/' . $filename
        // });
        $image->fit(64)->contrast(-40)->brightness(-10)->save(PhotoHelper::smallifyUri($uri));

        return response()->json(null, 201);
    }

    public function update(Request $request, Photo $photo) {

        if ($request->header('authcode') != AuthHelper::getAuthCode()) return response()->json(null, 500);

        $photo->update($request->all());
        return response()->json($photo, 200);
    }

    public function delete(Request $request, Photo $photo) {

        if ($request->header('authcode') != AuthHelper::getAuthCode()) return response()->json(null, 500);

        PhotoHelper::deletePhotoFromDisk($photo);

        $photo->delete();
        return response()->json(null, 204);
    }

}
