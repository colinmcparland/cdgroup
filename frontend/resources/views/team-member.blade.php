@extends('layouts.base')

@section('title', 'CD Group - Team Member')
@section('desc', 'Team Member of Community Development Group')

@section('content')
  @include('partials.header')

  <div class="container my-lg-5 mb-5 mb-lg-0">
    <div class="row">
      @include('partials.team-member.sidebar')
      @include('partials.team-member.content')
    </div>
  </div>

  @include('partials.footer')
@stop