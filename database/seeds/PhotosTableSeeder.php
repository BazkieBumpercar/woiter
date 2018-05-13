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
            'published' => TRUE,
            'album_id' => 1
        ]);
        Photo::create([
            'title' => 'Lelijke auto',
            'description' => 'Wat een lelijke auto BAH',
            'location' => 'Duivendrecht',
            'published' => TRUE,
            'album_id' => 1
        ]);
        Photo::create([
            'title' => 'Appeltaart',
            'description' => 'Oma\'s taart vol smurrie',
            'location' => 'Wassenaar',
            'published' => TRUE,
            'album_id' => 2
        ]);
    }
}
