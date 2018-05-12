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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->post('galleries', 'GalleriesController@store');
Route::middleware('auth:api')->put('gallery/{gallery}', 'GalleriesController@update');
Route::middleware('auth:api')->delete('gallery/{gallery}', 'GalleriesController@delete');

Route::middleware('auth:api')->post('photos', 'PhotosController@store');
Route::middleware('auth:api')->put('photo/{photo}', 'PhotosController@update');
Route::middleware('auth:api')->delete('photo/{photo}', 'PhotosController@delete');
