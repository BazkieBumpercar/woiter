<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model {

    protected $fillable = [
        'title', 'description', 'location', 'published'
    ];

    protected $hidden = [
    ];

}
