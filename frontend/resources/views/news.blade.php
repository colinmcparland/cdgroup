@extends('layouts.base')

@section('title', 'CD Group - News + Views')
@section('desc', 'Latest News from CDGroup')

@section('content')
  @include('partials.header')
  @include('partials.news.filters')
  @include('partials.news.search')
  @include('partials.news.tiles')
  @include('partials.footer')
@stop