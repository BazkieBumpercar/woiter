<?php

use Illuminate\Database\Seeder;
use App\Gallery;

class GalleriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Gallery::create([
            'title' => 'Vehikels',
            'description' => 'Broem broem toet bimbambom',
            'published' => TRUE
        ]);
        Gallery::create([
            'title' => 'Etenswaar',
            'description' => 'Nommables',
            'published' => TRUE
        ]);
    }
}
