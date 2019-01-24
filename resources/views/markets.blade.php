@extends('layouts.base')

@section('title', 'CD Group - Markets')
@section('desc', 'Markets served by Community Development Group')

@section('content')
  @include('partials.header')
  @include('partials.markets.content-area-1')
  @include('partials.markets.tiles')
@stop