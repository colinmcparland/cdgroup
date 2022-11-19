@extends('layouts.base')

@section('title', 'CD Group - Project Post')
@section('desc', 'Project of Community Development Group')

@section('content')
  @include('partials.header')
  @include('partials.projects-post.content-area-1')
  @include('partials.projects-post.content-area-2')
  @include('partials.footer')
@stop