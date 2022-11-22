<div class="container contact-us__form my-5">
    <div class="row no-gutters">
        <div class="col-md-4 contact-us__form-">
            <div class="contact-us__form-title"></div>
        </div>
        <div class="col-md-8">
            <div class="contact-us__form-subtitle"></div>
            <div class="contact-us__form-content"></div>
            <form method="POST" action="/submit-contact-form" enctype="multipart/form-data"> 
                @csrf
                @method("PUT")
                <div class="col-12 my-3 px-0">
                    <div class="row no-gutters">
                        <div class="col-md-6 d-flex flex-column my-3 pr-3">
                            <small class="mb-3">Full Name</small>
                            <input type="text" name="name">
                        </div>
                        <div class="col-md-6 d-flex flex-column my-3">
                            <small class="mb-3">Email Address</small>
                            <input type="email" name="email">
                        </div>
                        <div class="col-12 d-flex flex-column my-3">
                            <small class="mb-3">Your Message</small>
                            <textarea name="content" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="col-12">
                            <div class="mb-3 g-recaptcha" name="g-recaptcha" data-sitekey="<?php echo getenv("RECAPTCHA_SITE_KEY") ?>"></div>
                        </div>
                        <div class="col-12">
                            <input type="submit">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>