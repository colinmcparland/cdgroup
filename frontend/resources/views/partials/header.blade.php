<div class="container-fluid" id="header">
  <div class="row justify-content-between align-items-center">
    <div class="col-10 col-lg-4">
      <a href="/">
        <img src="https://<?php echo getenv('ADMIN_HOST') ?>/wp-content/uploads/2019/01/logo.png" alt="CDG Logo">
      </a>
    </div>
    <div class="col-2 d-lg-none justify-content-center">
      <div class="mobile-menu-button">
        <svg class="bi bi-list mobile-menu-button__closed" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
        <svg class="bi bi-x mobile-menu-button__open" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
          <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
        </svg>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      @include('partials.nav')
    </div>
  </div>
</div>
