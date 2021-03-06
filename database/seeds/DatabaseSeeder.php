<?php

use Illuminate\Database\Seeder;

// use Database\Seeds\AlbumsTableSeeder;
// use Database\Seeds\PhotosTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AlbumsTableSeeder::class);
        $this->call(PhotosTableSeeder::class);
    }
}
