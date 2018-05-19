<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Woiters wappie fotosite</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
        <script src="{{mix('js/bootstrap.js')}}"></script>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                    @endauth
                </div>
            @endif

            <div id="root"></div>
            <script src="{{mix('js/app.js')}}"></script>
        </div>
    </body>
</html>
