export function toggleAboutMenu() {
  if(window.innerWidth > 1020) {
    $('#company').mouseover(function() {
      $('#company ul').fadeIn();
    });
  
    $('#company').mouseleave(function() {
      $('#company ul').fadeOut();
    });
  } 
}

export function toggleMarketsMenu() {
  if(window.innerWidth > 1020) {
    $('#markets').mouseover(function() {
      $('#markets ul').fadeIn();
    });
  
    $('#markets').mouseleave(function() {
      $('#markets ul').fadeOut();
    });
  }
}

export function toggleMobileMenu() {
  $('.mobile-menu-button').click(function() {
    $('#nav').toggle();
    $(".mobile-menu-button__open").toggle();
    $(".mobile-menu-button__closed").toggle();
  });
}

export function populateMarketsSubmenu() {
    const { markets_posts } = window;

    $('<ul></ul>').insertAfter('#markets > a');

    markets_posts.forEach(marketPost => {
        $('#markets ul').append(`
            <li>
                <a href="/markets/${marketPost.slug}">
                    <div class='h5 nav-text'>${marketPost.title.rendered}</div>
                </a>
            </li>
        `);
    });
}

export function toggleCapabilitiesMenu() {
  if(window.innerWidth > 1020) {
    $('#capabilities').mouseover(function() {
      $('#capabilities ul').fadeIn();
    });
  
    $('#capabilities').mouseleave(function() {
      $('#capabilities ul').fadeOut();
    });
  }
}

export function populateCapabilitiesSubmenu() {
    const { capabilities_posts } = window;

    $('<ul></ul>').insertAfter('#capabilities > a');

    capabilities_posts.forEach(capabilitiesPost => {
        $('#capabilities ul').append(`
            <li>
                <a href="/capabilities/${capabilitiesPost.slug}">
                    <div class='h5 nav-text'>${capabilitiesPost.title.rendered}</div>
                </a>
            </li>
        `);
    });
}

// export function toggleProjectsMenu() {
//   $('#projects').mouseover(function() {
//     $('#projects ul').fadeIn();
//   });

//   $('#projects').mouseleave(function() {
//     $('#projects ul').fadeOut();
//   });
// }

// export function populateProjectsSubmenu() {
//     const { projects_posts } = window;

//     $('<ul></ul>').insertAfter('#projects > a'); 

//     projects_posts.forEach(projectsPost => {
//         $('#projects ul').append(`
//             <li>
//                 <a href="/projects/${projectsPost.slug}">
//                     <div class='h5 nav-text'>${projectsPost.title.rendered}</div>
//                 </a>
//             </li>
//         `);
//     });
// }