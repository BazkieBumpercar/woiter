<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model {

    protected $fillable = [
        'title', 'album_id', 'description', 'location', 'url', 'published'
    ];

    protected $hidden = [
    ];

}
