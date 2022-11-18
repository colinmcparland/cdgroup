<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class JoinOurTeamEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $birthday;
    public $ba_grad;
    public $ba_major;
    public $ma_major;
    public $ma_grad;
    public $country;
    public $expertise;
    public $specialization;
    public $cv;
    public $coverletter;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $birthday, $ba_grad, $ba_major, $ma_grad, $ma_major, $country, $expertise, $specialization, $cv, $coverletter)
    {
        $this->name = $name;
        $this->birthday = $birthday;
        $this->ba_grad = $ba_grad;
        $this->ba_major = $ba_major;
        $this->ma_major = $ma_major;
        $this->ma_grad = $ma_grad;
        $this->country = $country;
        $this->expertise = $expertise;
        $this->specialization = $specialization;
        $this->cv = $cv;
        $this->coverletter = $coverletter;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $ret = $this->view('email.join-our-team');

        if($this->cv->path()) {
            $ret = $ret->attach($this->cv->path());
        }

        if($this->coverletter->path()) {
            $ret = $ret->attach($this->coverletter->path());
        }
        return $ret;
    }
}
