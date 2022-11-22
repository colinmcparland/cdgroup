import { populateHomeSlider } from './home.js';

(function($) {

  var url = 'http://admin.cdgroup-ae.test/wp-json/wp/v2';

  function populateHome() {
    return $.ajax({
      url: url + '/pages',
    })
    .done(function(data) {
      window.home = data
        .find(page => page.slug === 'home');
    });
  }

  $(document).ready(function() {
    var page = location.pathname;

    if(page === '/') {
      populateHome()
        .then(() => {
          return Promise.all([
            populateHomeSlider(),
          ]);
        })
        .then(() => {
          $('.slick-home').slick({
            slidesToShow: 1
          });
        });
    }
  });

})(jquery);