
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
  toggleMarketsMenu,
  populateMarketsSubmenu,
  toggleCapabilitiesMenu,
  populateCapabilitiesSubmenu
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

(function($) {

  /*
    Functions to fetch the content from the WP API
   */
  function fetchHomeData() {
    if(window.home_data) {
      return Promise.resolve();
    }

    return $.ajax({
      url: '/admin/wp-json/wp/v2/pages',
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
      url: '/admin/wp-json/wp/v2/pages',
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
      url: '/admin/wp-json/wp/v2/pages',
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
      url: '/admin/wp-json/wp/v2/pages',
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
      url: '/admin/wp-json/wp/v2/markets_post',
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
      url: '/admin/wp-json/wp/v2/capabilities_post',
    })
    .done(function(data) {
      window.capabilities_posts = data;
    });
  }

  function fetchProjectsPostData() {
    if(window.projects_post) {
      return Promise.resolve();
    }

    return $.ajax({
      url: '/admin/wp-json/wp/v2/projects_post?_embed',
    })
    .done(function(data) {
      window.projects_posts = data;
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
      console.log('a');
      return Promise.all([
        fetchCapabilitiesPostData(),
        fetchCapabilitiesData()
      ]).then(() => {
          populateCapabilities();
      });
    } else if(page.indexOf('capabilities/') > -1) {
      console.log('b');
      return Promise.all([
        fetchProjectsPostData(),
        fetchCapabilitiesPostData()
      ])
        .then(() => {
          populateSingleCapability()
        });
    } 
  };


  /*
    Build the nav menu
   */
  const buildNavMenu = () => {
    return Promise.all([
      fetchMarketPostData(),
      fetchCapabilitiesPostData()
    ])
      .then(() => {
        Promise.all([
          populateMarketsSubmenu(),
          toggleMarketsMenu(),
          fetchMarketPostData(),
          populateCapabilitiesSubmenu(),
          toggleCapabilitiesMenu()
        ]);
      }); 
  };

  $(document).ready(function() {

    buildNavMenu()
      .then(() => {
        return setupPageData();
      })
      .then(() => {
        console.log('page data done');
        $('.loading-overlay').fadeOut('slow');
      });
  });

})(jQuery);
