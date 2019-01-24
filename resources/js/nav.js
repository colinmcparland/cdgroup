export function toggleMarketsMenu() {
  $('#markets').mouseover(function() {
    $('#markets ul').fadeIn();
  });

  $('#markets').mouseleave(function() {
    $('#markets ul').fadeOut();
  });
}

export function populateMarketsSubmenu() {
    const { markets_posts } = window;

    $('<ul></ul>').insertAfter('#markets > a');

    markets_posts.forEach(marketPost => {
        $('#markets ul').append(`
            <li>
                <a href="/markets/${marketPost.title.rendered.replace(/ /g, '-').toLowerCase()}">
                    <div class='h5 nav-text'>${marketPost.title.rendered}</div>
                </a>
            </li>
        `);
    });
}

export function toggleCapabilitiesMenu() {
  $('#capabilities').mouseover(function() {
    $('#capabilities ul').fadeIn();
  });

  $('#capabilities').mouseleave(function() {
    $('#capabilities ul').fadeOut();
  });
}

export function populateCapabilitiesSubmenu() {
    const { capabilities_posts } = window;

    $('<ul></ul>').insertAfter('#capabilities > a');

    capabilities_posts.forEach(capabilitiesPost => {
        $('#capabilities ul').append(`
            <li>
                <a href="/capabilities/${capabilitiesPost.title.rendered.replace(/ /g, '-').toLowerCase()}">
                    <div class='h5 nav-text'>${capabilitiesPost.title.rendered}</div>
                </a>
            </li>
        `);
    });
}