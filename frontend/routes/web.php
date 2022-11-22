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

$url = getenv("ADMIN_URL") . '/wp-json/wp/v2';

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

Route::put('/submit-join-team-form', function(Request $request) {
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
    "secret" => getenv('RECAPTCHA_SECRET_KEY'),
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

    // @TODO: Do some proper error handling here
    echo "There was one or more failures. They were: <br />";
 
    foreach(Mail::failures() as $email_address) {
        echo " - $email_address <br />";
     }
 
 } else {
     echo "No errors, all sent successfully!";
 }

  return;
});

Route::put('/submit-contact-form', function(Request $request) {
  $name = $request->input('name');
  $email = $request->input('email');
  $content = $request->input('content');
  $recaptcha = $request->input('g-recaptcha-response');

  $client = new Client();
  $result = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
    "query" => [
    "secret" => getenv("RECAPTCHA_SECRET_KEY"),
    "response" => $recaptcha
  ]]);

  $validCaptcha = json_decode(($result->getBody()))->{'success'};
  $errorMessage = 'There was a problem submitting the form.  Please try again.';
  
  if($validCaptcha) {
    Mail::to('colin@tinybird.ca')->send(new ContactUsEmail($name, $email, $content)); 

    if(Mail::failures()) {
      return redirect('/contact')->with('message', $errorMessage);
    }
  } else {
    return redirect('/contact')->with('message', $errorMessage);
  }

  return redirect('/contact')->with('message', 'Thank you for contacting us.  We will be in touch as soon as possible.');
});

Route::get('/news/{news_slug}', function ($news_slug) use ($url) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', $url . '/news_post?per_page=100');
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

Route::get('/markets/{market_slug}', function ($market_slug) use ($url) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', $url . '/markets_post?per_page=100');
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

Route::get('/capabilities/{capability_slug}', function ($capability_slug) use ($url) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', $url . '/capabilities_post?per_page=100');
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


Route::get('/projects/{project_slug}', function ($project_slug) use ($url) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', $url . '/projects_post?per_page=100');
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

Route::get('/team/{team_member_slug}', function ($team_member_slug) use ($url) {

  //  Make sure this post type exists
  $client = new Client();
  $result = $client->request('GET', $url . '/team_members?per_page=100');
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



