<!DOCTYPE html>
<html>
<head>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>@yield('title')</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name='description' content="@yield('desc')">
  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
  <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600|Muli:400,700,800" rel="stylesheet">
  <link rel="shortcut icon" type="image/png" href="/favicon.ico">
  <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
  <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
  <div class="loading-overlay">
    <div class="sec sec-1">
      <span></span>
      <span></span>
    </div>
  </div>
  <div class="page">
    @yield('content')
  </div>
</body>
</html>
