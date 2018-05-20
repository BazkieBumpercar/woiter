<?php

namespace App\Utility;

class StringHelper {

    public static function createFilename($someString) {
        // Remove anything which isn't a word, whitespace, number
        // or any of the following caracters -_~,;[]().
        // If you don't need to handle multi-byte characters
        // you can use preg_replace rather than mb_ereg_replace
        // Thanks @Łukasz Rysiak!
        $file = $someString;
        $file = mb_ereg_replace("([^\w\s\d\-_~,;\[\]\(\).])", '', $file);
        //remove multiple dashes or whitespaces
        $file = preg_replace("/[\s-]+/", '_', $file);
        // Remove any runs of periods (thanks falstro!)
        $file = mb_ereg_replace("([\.]{2,})", '', $file);
        return $file;
    }

    public static function generateRandomUrl($photoName) {
        // generate random filename
        $url = StringHelper::createFilename($photoName . "_" . base64_encode(random_bytes(6)));
        return $url;
    }

}