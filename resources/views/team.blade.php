@extends('layouts.base')

@section('title', 'CD Group - Our Team')
@section('desc', 'Our Team')

@section('content')
  @include('partials.header')

  <div class="container">
      <div class="row my-5">
          <div class="col-12 team-title">Our Team</div>
      </div>
  </div>
  @include('partials.team.tiles')
  @include('partials.footer')
@stop