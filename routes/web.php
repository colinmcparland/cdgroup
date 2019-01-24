<?php

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return view('home');
});

Route::get('/about', function () {
  return view('about');
});

Route::get('/markets', function () {
  return view('markets');
});

Route::get('/markets/{market_title}', function ($market_title) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', 'http://' . $_SERVER['HTTP_HOST'] . '/admin/wp-json/wp/v2/markets_post');
  $valid_post = false;

  foreach(json_decode($result->getBody()) as $market_post) {
    if(ucwords(str_replace('-', ' ', $market_title)) === $market_post->title->rendered) {
      $valid_post = true;
    }
  }

  if($valid_post) {
    return view('market-post');
  } else {
    abort(404);
  }
  
});


Route::get('/capabilities', function () {
  return view('capabilities');
});

Route::get('/capabilities/{capability_title}', function ($capability_title) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', 'http://' . $_SERVER['HTTP_HOST'] . '/admin/wp-json/wp/v2/capabilities_post');
  $valid_post = false;

  foreach(json_decode($result->getBody()) as $capabilities_post) {
    if(ucwords(str_replace('-', ' ', $capability_title)) === $capabilities_post->title->rendered) {
      $valid_post = true;
    }
  }

  if($valid_post) {
    return view('capabilities-post');
  } else {
    abort(404);
  }
  
});


