<?php

use Illuminate\Database\Seeder;
use App\Album;

use App\Utility\StringHelper;

class AlbumsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Album::create([
            'title' => 'Vehikels',
            'description' => 'Broem broem toet bimbambom',
            'url' => \App\Utility\StringHelper::createFilename('Vehikels'),
            'published' => TRUE
        ]);
        Album::create([
            'title' => 'Etenswaar',
            'description' => 'Nommables',
            'url' => \App\Utility\StringHelper::createFilename('Etenswaar'),
            'published' => TRUE
        ]);
    }
}
