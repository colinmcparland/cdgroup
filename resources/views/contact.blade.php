@extends('layouts.base')

@section('title', 'CD Group - Contact Us')
@section('desc', 'Contact Us at Community Development Group')

@section('content')
  @include('partials.header')
  <div class="container">
      <div class="row">
          <div class="col-12 contact-header">Contact Us</div>
      </div>
  </div>
  @include('partials.contact.tiles')
  @include('partials.contact.form')
  @include('partials.footer')
@stop