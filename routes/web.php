<?php

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\JoinOurTeamEmail;
use App\Mail\ContactUsEmail;

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

Route::get('/news', function () {
  return view('news');
});

Route::get('/team', function () {
  return view('team');
});

Route::get('/join-our-team', function () {
  return view('join-our-team');
});

Route::get('/our-history', function () {
  return view('history');
});

Route::put('/submit-form', function(Request $request) {
  $name = $request->input('name');
  $birthday = $request->input('birthday');
  $ba_grad = $request->input('graduation-ba');
  $ba_major = $request->input('major-ba');
  $ma_major = $request->input('major-ma');
  $ma_grad = $request->input('graduation-ma');
  $country = $request->input('country');
  $expertise = $request->input('expertise');
  $specialization = $request->input('specialization');
  $cv = $request->cv;
  $coverletter = $request->file('cover-letter');
  $recaptcha = $request->input('g-recaptcha-response');

  $client = new Client();
  $result = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
    "query" => [
    "secret" => "6LfTtv4UAAAAAE0vXuNA-3PxfA004muLQUXGxGSh",
    "response" => $recaptcha
  ]]);

  $valid = json_decode(($result->getBody()))->{'success'};

  if($valid && $request->filled(['name', 'birthday', 'graduation-ba', 'major-ba', 'country', 'expertise', 'specialization']) && $request->hasFile('cv') == 1) {
    echo Mail::to('colin@tinybird.ca')->send(new JoinOurTeamEmail($name, $birthday, $ba_grad, $ba_major, $ma_grad, $ma_major, $country, $expertise, $specialization, $cv, $coverletter));
  } else {
    // Error
    echo "bye";
  }

  if( count(Mail::failures()) > 0 ) {

    echo "There was one or more failures. They were: <br />";
 
    foreach(Mail::failures() as $email_address) {
        echo " - $email_address <br />";
     }
 
 } else {
     echo "No errors, all sent successfully!";
 }

  return;
});

Route::put('/submit-form-contact', function(Request $request) {
  $name = $request->input('name');
  $email = $request->input('email');
  $message = $request->input('message');
  $recaptcha = $request->input('g-recaptcha-response');

  $client = new Client();
  $result = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
    "query" => [
    "secret" => "6LfTtv4UAAAAAE0vXuNA-3PxfA004muLQUXGxGSh",
    "response" => $recaptcha
  ]]);

  $valid = json_decode(($result->getBody()))->{'success'};

  if($valid && $request->filled(['name', 'email', 'message'])) {
    echo Mail::to('colin@tinybird.ca')->send(new ContactUsEmail($name, $email, $message)); 
  } else {
    // Error
    echo "bye";
  }

  if( count(Mail::failures()) > 0 ) {

    echo "There was one or more failures. They were: <br />";
 
    foreach(Mail::failures() as $email_address) {
        echo " - $email_address <br />";
     }
 
 } else {
     echo "No errors, all sent successfully!";
 }

  return;
});

Route::get('/news/{news_slug}', function ($news_slug) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', 'http://' . $_SERVER['HTTP_HOST'] . '/admin/wp-json/wp/v2/news_post?per_page=100');
  $valid_post = false;

  foreach(json_decode($result->getBody()) as $news_post) {
    if($news_slug === $news_post->slug) {
      $valid_post = true;
    }
  }

  if($valid_post) {
    return view('news-post');
  } else {
    abort(404);
  }
  
});

Route::get('/markets/{market_slug}', function ($market_slug) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', 'http://' . $_SERVER['HTTP_HOST'] . '/admin/wp-json/wp/v2/markets_post?per_page=100');
  $valid_post = false;

  foreach(json_decode($result->getBody()) as $market_post) {
    if($market_slug === $market_post->slug) {
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

Route::get('/capabilities/{capability_slug}', function ($capability_slug) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', 'http://' . $_SERVER['HTTP_HOST'] . '/admin/wp-json/wp/v2/capabilities_post?per_page=100');
  $valid_post = false;

  foreach(json_decode($result->getBody()) as $capabilities_post) {
    if($capability_slug === $capabilities_post->slug) {
      $valid_post = true;
    }
  }

  if($valid_post) {
    return view('capabilities-post');
  } else {
    abort(404);
  }
  
});

Route::get('/projects', function () {
  return view('projects');
});

Route::get('/contact', function () {
  return view('contact');
});


Route::get('/projects/{project_slug}', function ($project_slug) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', 'http://' . $_SERVER['HTTP_HOST'] . '/admin/wp-json/wp/v2/projects_post?per_page=100');
  $valid_post = false;

  foreach(json_decode($result->getBody()) as $projects_post) {
    if($project_slug === $projects_post->slug) {
      $valid_post = true;
    }
  }

  if($valid_post) {
    return view('projects-post');
  } else {
    abort(404);
  }
  
});

Route::get('/team/{team_member_slug}', function ($team_member_slug) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', 'http://' . $_SERVER['HTTP_HOST'] . '/admin/wp-json/wp/v2/team_members?per_page=100');
  $valid_post = false;

  foreach(json_decode($result->getBody()) as $team_member) {
    if($team_member_slug === $team_member->slug) {
      $valid_post = true;
    }
  }

  if($valid_post) {
    return view('team-member');
  } else {
    abort(404);
  }
  
});



