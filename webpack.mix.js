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

mix.react('resources/site.js', 'public/js')
   .react('resources/admin.js', 'public/js')
   .react('resources/assets/bootstrap.js', 'public/js')
   .styles('resources/woiter.css', 'public/css/woiter.css')
   .styles('resources/components/Site.css', 'public/css/site.css')
   .styles('resources/components/Admin.css', 'public/css/admin.css')
   .styles('resources/components/AlbumViewer.css', 'public/css/albumviewer.css')
   .styles('resources/components/AlbumEditor.css', 'public/css/albumeditor.css');
//   .sass('resources/assets/sass/app.scss', 'public/css');
