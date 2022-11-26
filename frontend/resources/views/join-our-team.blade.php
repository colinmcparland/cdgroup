@extends('layouts.base')

@section('title', 'CD Group - Join Our Team')
@section('desc', 'Join the CDGroup team')

@section('content')
  @include('partials.header')
  <div class="container-fluid">
      <div class="row">
        <div class="join-our-team__hero"></div>
      </div>
  </div>

  <div class="container">
      <div class="row join-our-team">
        <div class="col-12 col-md-8 order-md-2 order-1">
          @include('partials.join-our-team.content')
        </div>
          <div class="col-12 col-md-4 order-md-1 order-2">
              <form method="post" action="/submit-join-team-form" enctype="multipart/form-data">
                <input name="_method" value="PUT" type="hidden"></input>
                @csrf
                <div class="row no-gutters join-our-team__form mt-5 pr-3">
                  @include('partials.join-our-team.form')
                </div>
              </form>
          </div>
      </div>
  </div>
  @include('partials.footer')
@stop
