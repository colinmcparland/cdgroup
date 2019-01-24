@extends('layouts.base')

@section('title', 'CD Group - Capabilities Post')
@section('desc', 'Capabilities of Community Development Group')

@section('content')
  @include('partials.header')
  @include('partials.capabilities-post.content-area-1')
  @include('partials.capabilities-post.content-area-2')
  @include('partials.capabilities-post.cta')
  @include('partials.capabilities-post.project-tiles')
@stop