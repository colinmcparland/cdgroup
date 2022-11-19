@extends('layouts.base')

@section('title', 'CD Group')
@section('desc', 'Community Development Group Homepage')

@section('content')
  @include('partials.header')
  @include('partials.home.slider')
  @include('partials.home.after-slider-blurb')
  @include('partials.home.content-area-1')
  @include('partials.home.content-area-2')
  @include('partials.home.markets-area')
  @include('partials.home.capabilities-area')
  @include('partials.home.projects-area')
  @include('partials.home.careers')
  @include('partials.footer')
@stop