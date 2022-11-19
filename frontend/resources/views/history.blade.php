@extends('layouts.base')

@section('title', 'CD Group - Our History')
@section('desc', 'The History of Community Development Group')

@section('content')
  @include('partials.header')
  <div class="container">
    <div class="row">
        <div class="contact-header col-12">Our History</div>
    </div>
</div>
  @include('partials.history.heading')
  @include('partials.history.main-content')
  @include('partials.footer')
@stop