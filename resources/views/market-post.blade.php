@extends('layouts.base')

@section('title', 'CD Group - Markets')
@section('desc', 'Markets served by Community Development Group')

@section('content')
  @include('partials.header')
  @include('partials.market-post.content-area-1')
  @include('partials.market-post.content-area-2')
  @include('partials.market-post.cta')
  @include('partials.market-post.project-tiles')
@stop