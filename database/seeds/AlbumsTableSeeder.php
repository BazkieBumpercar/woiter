<?php

use Illuminate\Database\Seeder;
use App\Album;

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
            'published' => TRUE
        ]);
        Album::create([
            'title' => 'Etenswaar',
            'description' => 'Nommables',
            'published' => TRUE
        ]);
    }
}
