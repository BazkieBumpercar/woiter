<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

/*
Route::middleware('auth:api')->post('albums', 'AlbumsController@store');
Route::middleware('auth:api')->put('album/{album}', 'AlbumsController@update');
Route::middleware('auth:api')->delete('album/{album}', 'AlbumsController@delete');

Route::middleware('auth:api')->post('photos', 'PhotosController@store');
Route::middleware('auth:api')->put('photo/{photo}', 'PhotosController@update');
Route::middleware('auth:api')->delete('photo/{photo}', 'PhotosController@delete');
*/

Route::get('albums', 'AlbumsController@index');
Route::get('album/{album}', 'AlbumsController@show');
Route::post('album', 'AlbumsController@store');
Route::put('album/{album}', 'AlbumsController@update');
Route::delete('album/{album}', 'AlbumsController@delete');

Route::get('photos', 'PhotosController@index');
Route::get('photo/{photo}', 'PhotosController@show');
Route::get('photos/{album}', 'PhotosController@getByAlbumId');
Route::get('photos/thumbnails/{album}', 'PhotosController@getThumbnailsByAlbumId');
Route::post('photo', 'PhotosController@store');
Route::post('photo_imagedata', 'PhotosController@store_imagedata');
Route::put('photo/{photo}', 'PhotosController@update');
Route::delete('photo/{photo}', 'PhotosController@delete');
