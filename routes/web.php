<?php

use App\Photo;

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
    return view('welcome');
});

Route::get('galleries', 'GalleriesController@index');
Route::get('gallery/{gallery}', 'GalleriesController@show');
/*
Route::post('galleries', 'GalleriesController@store');
Route::put('gallery/{gallery}', 'GalleriesController@update');
Route::delete('gallery/{gallery}', 'GalleriesController@delete');
*/

Route::get('photos', 'PhotosController@index');
Route::get('photo/{photo}', 'PhotosController@show');
/*
Route::post('photos', 'PhotosController@store');
Route::put('photo/{photo}', 'PhotosController@update');
Route::delete('photo/{photo}', 'PhotosController@delete');
*/