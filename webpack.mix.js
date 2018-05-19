let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/app.js', 'public/js')
   .react('resources/assets/bootstrap.js', 'public/js')
   .styles('resources/app.css', 'public/css/app.css')
   .styles('resources/components/Frontpage.css', 'public/css/frontpage.css')
   .styles('resources/components/AlbumViewer.css', 'public/css/albumviewer.css');
//   .sass('resources/assets/sass/app.scss', 'public/css');
