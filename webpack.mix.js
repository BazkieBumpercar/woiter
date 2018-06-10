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

mix//.options({ imgLoaderOptions: { enable: false } })
   .react('resources/site.js', 'public/js').sourceMaps()
   .react('resources/admin.js', 'public/js').sourceMaps()
   .copyDirectory('resources/assets/icons', 'public/icons')
   //.react('resources/assets/bootstrap.js', 'public/js')
   .styles('resources/components/css/Site.css', 'public/css/site.css')
   .styles('resources/components/css/Admin.css', 'public/css/admin.css')
   .styles('resources/components/css/AlbumViewer.css', 'public/css/albumviewer.css')
   .styles('resources/components/css/AlbumEditor.css', 'public/css/albumeditor.css')
   .styles('resources/assets/lightbox2/css/lightbox.min.css', 'public/css/lightbox.css');
//   .sass('resources/assets/sass/app.scss', 'public/css');
