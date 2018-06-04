<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:300,400,500,700" rel="stylesheet">

        <title>Woiters wappie fotosite</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div id="root" class="root"></div>
            <script src="{{mix('/js/site.js')}}" type="text/javascript"></script>
        </div>
    </body>
</html>
