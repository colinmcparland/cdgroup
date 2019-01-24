@extends('layouts.base')

@section('title', 'CD Group - About')
@section('desc', 'About Community Development Group')

@section('content')
  @include('partials.header')
  @include('partials.about.content-area-1')
  @include('partials.about.cta-1')
  @include('partials.about.content-area-2')
  @include('partials.about.content-area-3')
@stop