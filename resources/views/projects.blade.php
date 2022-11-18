@extends('layouts.base')

@section('title', 'CD Group - Projects')
@section('desc', 'Projects by Community Development Group')

@section('content')
  @include('partials.header')
  @include('partials.projects.content-area-1')
  @include('partials.projects.filter-buttons')
  @include('partials.projects.filters-panel')
  @include('partials.projects.search-panel')
  @include('partials.projects.tiles')
  @include('partials.footer')
@stop