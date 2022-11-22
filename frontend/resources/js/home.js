export function populateHomeSlider() {
  return new Promise((resolve, reject) => {
    const { acf } = window.home_data || {};
    const { projects_posts } = window || {};
    
    // Populate the dang slider
    acf && acf.slider_images && acf.slider_images
      .forEach(slide => {
        const thisSliderProject = projects_posts && slide.link && slide.link.ID && projects_posts.find(post => post.id === slide.link.ID);
        const thisSliderProjectSlug = thisSliderProject && thisSliderProject.slug;

        $('.home-slider__slick').append(`
          <div class='home-slide-container'>
            <a href=${thisSliderProjectSlug ? `/projects/${thisSliderProjectSlug}` : "#"}>
            <img src=${slide && slide.image ? slide.image : ""} />
            <div class="slide-meta">
              <p>${slide && slide.title ? slide.title : ""}</p>
              <p>${slide && slide.description ? slide.description : ""}</p>
            </div>
            </a>
          </div>
        `);
      });

    $('.home-slider__slick').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true
    });

    $('.home-slider__heading').html(window.home_data.acf.heading);

    resolve();
  });
}

export function populateAfterSliderBlurb() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { after_slider_blurb } = window.home_data.acf || {};

        $('.home-slider-blurb__title').html(after_slider_blurb && after_slider_blurb.title ? after_slider_blurb.title : "");
        $('.home-slider-blurb__content').html(after_slider_blurb && after_slider_blurb.content ? after_slider_blurb.content : "");
        $('.home-slider-blurb__content').prepend(`<h2 class="home-slider-blurb__heading">${after_slider_blurb && after_slider_blurb.heading ? after_slider_blurb.heading : ""}</h2>`);
    });
}

export function populateHomeContentSection1() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { first_content_area } = window.home_data.acf || {};

        $('.home-content-area-1__heading').html(first_content_area && first_content_area.heading ? first_content_area.heading : "");
        $(first_content_area && first_content_area.content ? first_content_area.content : "").insertAfter($('.home-content-area-1__heading'));
        $('.home-content-area-1__image').append(`<img src=${first_content_area && first_content_area.image ? first_content_area.image : ""} />`);
        $('.home-content-area-1__button').html(first_content_area && first_content_area.button_text ? first_content_area.button_text : "");
        $('.home-content-area-1__button').attr('href', first_content_area && first_content_area.button_link ? first_content_area.button_link : "");
    });
}

export function populateHomeContentSection2() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { second_content_area } = window.home_data.acf || {};

        $('.home-content-area-2__heading').html(second_content_area && second_content_area.heading ? second_content_area.heading : "");
        $(second_content_area && second_content_area.content ? second_content_area.content : "").insertAfter($('.home-content-area-2__heading'));
        $('.home-content-area-2__image').append(`<img src=${second_content_area && second_content_area.image ? second_content_area.image : ""} />`);
        $('.home-content-area-2__button').html(second_content_area && second_content_area.button_text ? second_content_area.button_text : "");
        $('.home-content-area-2__button').attr('href', second_content_area && second_content_area.button_link ? second_content_area.button_link : "");
    });
}

export function populateHomeMarketsSection() {
    return new Promise((resolve, reject) => {
        const { markets_posts } = window;
        const { markets } = window.home_data.acf || {};

        $('.home-markets__heading').html(markets && markets.heading ? markets.heading : "");
        $('.home-markets__content').html(markets && markets.blurb ? markets.blurb : "");

        markets_posts && markets_posts.forEach(markets_post => {
            $('.home-markets__cards').append(`
                <div class="col-12 col-lg-6 py-3 my-2 home-markets__card">
                    <a href="/markets/${markets_post && markets_post.slug ? markets_post.slug : ""}">
                        ${markets_post && markets_post.title && markets_post.title.rendered ? markets_post.title.rendered : ""}
                    </a>
                </div>
            `);
        });
    });
}

export function populateHomeCapabilitiesSection() {
    return new Promise((resolve, reject) => {
        const { capabilities_posts } = window;
        const { capabilities } = window.home_data.acf || {};

        $('.home-capabilities__heading').html(capabilities && capabilities.heading ? capabilities.heading : "");
        $('.home-capabilities__content').html(capabilities && capabilities.blurb ? capabilities.blurb : "");

        capabilities_posts && capabilities_posts.forEach(capabilities_post => {
            $('.home-capabilities__cards').append(`
                <div class="col-12 col-lg-6 py-3 my-2 home-capabilities__card">
                    <a href="/capabilities/${capabilities_post.slug}">
                        ${capabilities_post && capabilities_post.title && capabilities_post.title.rendered ? capabilities_post.title.rendered : ""}
                    </a>
                </div>
            `);
        });
    });
}

export function populateHomeProjectsSection() {
    return new Promise((resolve, reject) => {
        const { projects_posts } = window;

        projects_posts && projects_posts.slice(0, 6).forEach(projects_post => {
            $('.home-projects__cards').append(`
                <div class="col-12 col-sm-6 col-lg-4 home-projects__card">
                    <a href="/projects/${projects_post && projects_post.slug ? projects_post.slug : ""}">
                        <div style="background-image: url(${projects_post && projects_post._embedded &&  projects_post._embedded['wp:featuredmedia'] &&  projects_post._embedded['wp:featuredmedia'][0] &&  projects_post._embedded['wp:featuredmedia'][0].source_url ? projects_post._embedded['wp:featuredmedia'][0].source_url : ""});" class="project-image-container"></div>
                        <p>${projects_post && projects_post.title && projects_post.title.rendered ? projects_post.title.rendered : ""}</p>
                    </a>
                </div>
            `);
        });
    });
}

export function populateHomeCareerSection() {
    return new Promise((resolve, reject) => {
        const { careers } = window.home_data.acf || {};

        $('.home-careers__button')
            .attr('href', careers && careers.link_target ? careers.link_target : "")
            .html(careers && careers.link_text ? careers.link_text : "");

        $('.home-careers__heading').html(careers && careers.heading ? careers.heading : "");
    });
}