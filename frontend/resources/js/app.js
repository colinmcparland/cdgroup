
/**
 * First we will load all of this project's JavaScript dependencies
 */
require('./bootstrap');
require('slick-carousel');

import {
  populateHomeSlider,
  populateAfterSliderBlurb,
  populateHomeContentSection1,
  populateHomeContentSection2,
  populateHomeMarketsSection,
  populateHomeCapabilitiesSection,
  populateHomeProjectsSection,
  populateHomeCareerSection
} from './home.js';

import {
  populateAboutContentArea1,
  populateAboutCTA,
  populateAboutContentArea2,
  populateAboutContentArea3
} from './about.js';

import {
  populateMarketsContentArea1,
  populateMarketsTiles,
} from './markets.js';

import {
  populateProjectsContentArea1,
  populateProjectsTiles,
  projectFilterListeners,
  populateFilters
} from './projects.js';

import {
  toggleMarketsMenu,
  populateMarketsSubmenu,
  toggleCapabilitiesMenu,
  populateCapabilitiesSubmenu,
  toggleAboutMenu,
  toggleMobileMenu
} from './nav.js';

import {
  populateSingleMarket
} from './single-market.js';

import {
  populateSingleCapability
} from './single-capability.js';

import {
  populateCapabilities
} from './capabilities.js';

import {
  populateSingleProject
} from './single-project.js';

import {
  populateNewsTiles,
  populateSingleNews,
  newsListeners
} from './news.js';

import {
  populateTeam
} from "./team.js";

import {
  populateJoinOurTeam
} from "./join-our-team.js";

import {
  populateContactTiles,
  populateContactPageData
} from "./contact";

import {
  populateHistoryPageData
} from "./history";

import {
  populateSingleTeam
} from "./single-team";

(function($) {
  var url = 'https://' + process.env.MIX_ADMIN_HOST + '/wp-json/wp/v2';

  /*
    Functions to fetch the content from the WP API
   */
  function fetchHomeData() {
    if(window.home_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.home_data = data
        .find(page => page.slug === 'home');
    });
  }

  function fetchAboutData() {
    if(window.about_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.about_data = data
        .find(page => page.slug === 'about');
    });
  }

  function fetchMarketsData() {
    if(window.markets_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.markets_data = data
        .find(page => page.slug === 'markets');
    });
  }

  function fetchCapabilitiesData() {
    if(window.capabilities_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.capabilities_data = data
        .find(page => page.slug === 'capabilities');
    });
  }

  function fetchMarketPostData() {
    if(window.markets_posts) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/markets_post?per_page=100&_embed',
    })
    .done(function(data) {
      window.markets_posts = data;
    });
  }

  function fetchCapabilitiesPostData() {
    if(window.capabilities_posts) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/capabilities_post?per_page=100&_embed',
    })
    .done(function(data) {
      window.capabilities_posts = data;
    });
  }

  function fetchProjectsData() {
    if(window.projects_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.projects_data = data
        .find(page => page.slug === 'projects');
    });
  }

  function fetchProjectsPostData() {
    if(window.projects_post) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/projects_post?per_page=100&_embed',
    })
    .done(function(data) {
      window.projects_posts = data;
    });
  }

  function fetchNewsPostData() {
    if(window.news_posts) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/news_post?per_page=100&_embed',
    })
    .done(function(data) {
      window.news_posts = data;
    });
  }

  function fetchTeamPostData() {
    if(window.team_posts) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/team_members?per_page=100&_embed',
    })
    .done(function(data) {
      window.team_posts = data;
    });
  }

  function fetchJoinOurTeamData() {
    if(window.join_our_team_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.join_our_team_data = data
        .find(page => page.slug === 'join-our-team');
    });
  }

  function fetchContactPostData() {
    if(window.contact_posts) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/contact_locations?per_page=100&_embed',
    })
    .done(function(data) {
      window.contact_posts = data;
    });
  }

  function fetchContactPageData() {
    if(window.contact_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.contact_data = data
        .find(page => page.slug === 'contact-us');
    });
  }

  function fetchHistoryData() {
    if(window.history_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: url + '/pages?per_page=100&_embed',
    })
    .done(function(data) {
      window.history_data = data
        .find(page => page.slug === 'our-history');
    });
  }


  /*
    Function to setup the page data, ie. call a population function and add the content to the DOM
   */
  const setupPageData = () => {
    var page = location.pathname;

    if(page === '/') {
      return Promise.all([
        fetchHomeData(),
        fetchCapabilitiesPostData(),
        fetchProjectsPostData()
      ])
        .then(() => {
          Promise.all([
            populateHomeSlider(),
            populateAfterSliderBlurb(),
            populateHomeContentSection1(),
            populateHomeContentSection2(),
            populateHomeMarketsSection(),
            populateHomeCapabilitiesSection(),
            populateHomeProjectsSection(),
            populateHomeCareerSection()
          ]);
        });
    }
    else if(page === '/about') {
      return Promise.all([
        fetchAboutData(),
      ])
        .then(() => {
          Promise.all([
            populateAboutContentArea1(),
            populateAboutCTA(),
            populateAboutContentArea2(),
            populateAboutContentArea3()
          ]);
        });
    }
    else if(page === '/markets') {
      return Promise.all([
        fetchMarketsData(),
      ])
        .then(() => {
          Promise.all([
            populateMarketsContentArea1(),
            populateMarketsTiles(),
          ]);
        });
    } else if(page.indexOf('markets/') > -1) {
      return Promise.all([
        fetchProjectsPostData(),
        fetchMarketPostData()
      ])
        .then(() => {
          populateSingleMarket();
        });
    } else if(page === '/capabilities') {
      return Promise.all([
        fetchCapabilitiesPostData(),
        fetchCapabilitiesData()
      ]).then(() => {
          populateCapabilities();
      });
    } else if(page.indexOf('capabilities/') > -1) {
      return Promise.all([
        fetchProjectsPostData(),
        fetchCapabilitiesPostData()
      ])
        .then(() => {
          populateSingleCapability()
        });
    } else if(page === '/projects') {
      localStorage.clear();
      localStorage.setItem("projects-sort", "az");
      return Promise.all([
        fetchProjectsPostData(),
        fetchProjectsData(),
        fetchMarketPostData(),
        fetchCapabilitiesPostData()
      ])
        .then(() => {
          Promise.all([
            populateProjectsContentArea1(),
            populateProjectsTiles(),
            populateFilters()
          ]);
        });
    } else if(page.indexOf('projects/') > -1) {
      return Promise.all([
        fetchProjectsPostData()
      ])
        .then(() => {
            populateSingleProject()
        });
    } else if(page === '/news') {
      localStorage.clear();
      localStorage.setItem("news-sort", "newfirst");
      return Promise.all([
        fetchNewsPostData()
      ])
        .then(() => {
            populateNewsTiles()
        });
    } else if(page.indexOf('news/') > -1) {
      return Promise.all([
        fetchNewsPostData()
      ])
        .then(() => {
            populateSingleNews()
        });
    } else if(page === "/team") {
      return Promise.all([
        fetchTeamPostData()
      ])
        .then(() => {
            populateTeam()
        });

    } else if(page.indexOf('team/') > -1) {
      return Promise.all([
        fetchTeamPostData()
      ])
        .then(() => {
          populateSingleTeam()
        });
    }
     else if(page === "/join-our-team") {
      return Promise.all([
        fetchJoinOurTeamData(),
        fetchMarketPostData()
      ])
        .then(() => {
            populateJoinOurTeam()
        });
    } else if(page === "/contact") {
      return Promise.all([
        fetchContactPostData(),
        fetchContactPageData()
      ])
        .then(() => {
           populateContactTiles(),
           populateContactPageData()
        });
    } else if(page === "/our-history") {
      return Promise.all([
        fetchHistoryData()
      ])
        .then(() => {
           populateHistoryPageData()
        });
    }
  };


  /*
    Build the nav menu
   */
  const buildNavMenu = () => {
    return Promise.all([
      fetchMarketPostData(),
      fetchCapabilitiesPostData(),
      fetchProjectsPostData()
    ])
      .then(() => {
        Promise.all([
          populateMarketsSubmenu(),
          toggleMarketsMenu(),
          fetchMarketPostData(),
          populateCapabilitiesSubmenu(),
          toggleCapabilitiesMenu(),
          toggleAboutMenu(),
          toggleMobileMenu()
        ]);
      });
  };

  /*
    Add listeners for page interactions
  */
 const setupEventListeners = () => {
  return Promise.all([
    projectFilterListeners(),
    newsListeners()
  ]);
 };

  $(document).ready(function() {

    buildNavMenu()
      .then(() => {
        return setupPageData();
      })
      .then(() => {
        return setupEventListeners();
      })
      .then(() => {
        $('.loading-overlay').fadeOut('slow');
      });
  });

})(jQuery);
