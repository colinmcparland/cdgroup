@extends('layouts.base')

@section('title', 'CD Group - Capabilities')
@section('desc', 'Capabilities of Community Development Group')

@section('content')
  @include('partials.header')
  @include('partials.capabilities.content-area-1')
  @include('partials.capabilities.tiles')
  @include('partials.footer')
@stop