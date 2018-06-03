<?php

namespace App\Utility;

use App\Album;
use App\Photo;

class PhotoHelper {

    public static function deletePhotoFromDisk(Photo $photo) {
        $result = Album::where('id', '=', $photo->album_id);//DB::table('albums')->get()->where('id', $photo->album_id);
        $album = $result->first();
        $uri = 'photos/' . $album->url . '/' . $photo->url;
        if (file_exists($uri)) unlink($uri);
        $uri_small = self::smallifyUri($uri);
        if (file_exists($uri_small)) unlink($uri_small);
    }

    public static function smallifyUri($uri) {
        return substr($uri, 0, strrpos($uri, '.')) . '_small' . substr($uri, strrpos($uri, '.'));
    }

}