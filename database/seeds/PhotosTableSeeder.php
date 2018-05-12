<?php

use Illuminate\Database\Seeder;
use App\Photo;

class PhotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Photo::create([
            'title' => 'Mooie fiets',
            'description' => 'Wat een mooie fiets oooh',
            'location' => 'Groningen city',
            'published' => TRUE
        ]);
        Photo::create([
            'title' => 'Lelijke auto',
            'description' => 'Wat een lelijke auto BAH',
            'location' => 'Duivendrecht',
            'published' => TRUE
        ]);
    }
}
