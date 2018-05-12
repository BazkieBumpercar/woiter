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

}
