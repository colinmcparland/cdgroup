@extends('layouts.base')

@section('title', 'CD Group - News Post')
@section('desc', 'CDGroup News Item')

@section('content')
  @include('partials.header')
  @include('partials.news-post.news-post')
  @include('partials.footer')
@stop