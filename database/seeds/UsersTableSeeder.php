<?php

use Illuminate\Database\Seeder;
use App\User;

use App\Utility\StringHelper;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'woiter',
            'email' => 'woitar@gmail.com',
            'password' => '$2y$10$v/XK2pUJEQjZZKxDd514F.gCr1k5jeUAuQENYhziajvlgpfQOd2s.',
            'remember_token' => '',
            'api_token' => 'woiterski'
        ]);
    }
}
