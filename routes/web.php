<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('site');
});

Route::get('/admin/', function () {
    return view('admin');
});

/*
Route::get('albums', 'AlbumsController@index');
Route::get('album/{album}', 'AlbumsController@show');
// to be moved to api.php (auth middleware)
Route::post('albums', 'AlbumsController@store');
Route::put('album/{album}', 'AlbumsController@update');
Route::delete('album/{album}', 'AlbumsController@delete');

Route::get('photos', 'PhotosController@index');
Route::get('photo/{photo}', 'PhotosController@show');
// to be moved to api.php (auth middleware)
Route::post('photos', 'PhotosController@store');
Route::put('photo/{photo}', 'PhotosController@update');
Route::delete('photo/{photo}', 'PhotosController@delete');
*/
