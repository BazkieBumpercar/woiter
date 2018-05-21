<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model {

    protected $fillable = [
        'title', 'description', 'url', 'published'
    ];

    protected $hidden = [
    ];

}
