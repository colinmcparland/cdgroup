<?php

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\JoinOurTeamEmail;
use App\Mail\ContactUsEmail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

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

$url = 'https://' . getenv("ADMIN_HOST") . '/wp-json/wp/v2';
$client = new Client([ 'verify' => getenv("DEV") === 'false' ]);

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

Route::put('/submit-join-team-form', function(Request $request) use ($client) {
  $name = $request->input('name');
  $birthday = $request->input('birthday');
  $ba_grad = $request->input('graduation-ba');
  $ba_major = $request->input('major-ba');
  $ma_major = $request->input('major-ma');
  $ma_grad = $request->input('graduation-ma');
  $country = $request->input('country');
  $expertise = $request->input('expertise');
  $specialization = $request->input('specialization');
  $cv = $request->file('cv');
  $coverletter = $request->file('cover-letter');
  $recaptcha = $request->input('g-recaptcha-response');

  $client = new Client();

  // Validate input
  $validator = Validator::make($request->all(), [
    'name' => 'required',
    'birthday' => 'required',
    'graduation-ba' => 'required',
    'major-ba' => 'required',
    'country' => 'required',
    'expertise' => 'required',
    'specialization' => 'required',
    'cv' => 'required|mimes:pdf',
    'cover-letter' => 'mimes:pdf'
  ]);

  if ($validator->fails() || $request->hasFile('cv') != 1) {
    return redirect('/join-our-team')->with('message', 'There was a problem validating the form input.  Please try again.');
  }

  // Validate captcha
  $result = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
    "query" => [
      "secret" => getenv('RECAPTCHA_SECRET_KEY'),
      "response" => $recaptcha,
    ]
  ]);
  $validCaptcha = json_decode(($result->getBody()))->{'success'};

  if(!$validCaptcha) {
    return redirect('/join-our-team')->with('message', 'There was a problem validating the captcha.  Please try again.');
  }

  Mail::to(['jobs@cdgroup-ae.com', 'info@cdgroup-ae.com'])->send(new JoinOurTeamEmail($name, $birthday, $ba_grad, $ba_major, $ma_grad, $ma_major, $country, $expertise, $specialization, $cv, $coverletter));

  if(Mail::failures()) {
    return redirect('/join-our-team')->with('message', 'There was a problem sending your message.  Please try again.');
  }

  return redirect('/join-our-team')->with('message', 'Thank you for contacting us.  We will be in touch as soon as possible.');
});

Route::put('/submit-contact-form', function(Request $request) use ($client) {
  $name = $request->input('name');
  $email = $request->input('email');
  $content = $request->input('content');
  $recaptcha = $request->input('g-recaptcha-response');

  // Validate input
  $validator = Validator::make($request->all(), [
      'name' => 'required',
      'email' => 'required',
      'content' => 'required'
  ]);

  if ($validator->fails()) {
    return redirect('/contact')->with('message', 'There was a problem validating the form input.  Please try again.');
  }

  // Validate recaptcha
  $result = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
    "query" => [
      "secret" => getenv("RECAPTCHA_SECRET_KEY"),
      "response" => $recaptcha
    ]
  ]);
  $validCaptcha = json_decode(($result->getBody()))->{'success'};

  if(!$validCaptcha) {
    return redirect('/contact')->with('message', 'There was an error validating your CAPTCHA.  Please try again.');
  }

  Mail::to('info@cdgroup-ae.com')->send(new ContactUsEmail($name, $email, $content));

  if(Mail::failures()) {
    return redirect('/contact')->with('message', 'There was a problem sending your message.  Please try again.');
  }

  return redirect('/contact')->with('message', 'Thank you for contacting us.  We will be in touch as soon as possible.');
});

Route::get('/news/{news_slug}', function ($news_slug) use ($url, $client) {

  //  Make sure this post type exists
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

Route::get('/markets/{market_slug}', function ($market_slug) use ($url, $client) {

  //  Make sure this post type exists
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

Route::get('/capabilities/{capability_slug}', function ($capability_slug) use ($url, $client) {

  //  Make sure this post type exists
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


Route::get('/projects/{project_slug}', function ($project_slug) use ($url, $client) {

  //  Make sure this post type exists
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

Route::get('/team/{team_member_slug}', function ($team_member_slug) use ($url, $client) {

  //  Make sure this post type exists
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



