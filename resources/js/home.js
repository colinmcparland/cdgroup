export function populateHomeSlider() {
  return new Promise((resolve, reject) => {
    const { acf } = window.home_data;
    
    // Populate the dang slider
    acf.slider_images
      .forEach(slide => {
        $('.home-slider__slick').append(`
          <div class='home-slide-container'>
            <img src=${slide.image} />
            <div class="slide-meta">
              <p>${slide.title}</p>
              <p>${slide.description}</p>
            </div>
          </div>
        `);
      });

    $('.home-slider__slick').slick();

    $('.home-slider__heading').html(window.home_data.acf.heading);

    resolve();
  });
}

export function populateAfterSliderBlurb() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { after_slider_blurb } = window.home_data.acf;

        $('.home-slider-blurb__title').html(after_slider_blurb.title);
        $('.home-slider-blurb__content').html(after_slider_blurb.content);
        $('.home-slider-blurb__content').prepend(`<h2 class="home-slider-blurb__heading">${after_slider_blurb.heading}</h2>`);
    });
}

export function populateHomeContentSection1() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { first_content_area } = window.home_data.acf;

        $('.home-content-area-1__heading').html(first_content_area.heading);
        $(first_content_area.content).insertAfter($('.home-content-area-1__heading'));
        $('.home-content-area-1__image').append(`<img src=${first_content_area.image} />`);
        $('.home-content-area-1__button').html(first_content_area.button_text);
        $('.home-content-area-1__button').attr('href', first_content_area.button_link);
    });
}

export function populateHomeContentSection2() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { second_content_area } = window.home_data.acf;

        $('.home-content-area-2__heading').html(second_content_area.heading);
        $(second_content_area.content).insertAfter($('.home-content-area-2__heading'));
        $('.home-content-area-2__image').append(`<img src=${second_content_area.image} />`);
        $('.home-content-area-2__button').html(second_content_area.button_text);
        $('.home-content-area-2__button').attr('href', second_content_area.button_link);
    });
}

export function populateHomeMarketsSection() {
    return new Promise((resolve, reject) => {
        const { markets_posts } = window;
        const { markets } = window.home_data.acf;

        $('.home-markets__heading').html(markets.heading);
        $('.home-markets__content').html(markets.blurb);

        markets_posts.forEach(markets_post => {
            $('.home-markets__cards').append(`
                <div class="col-6 py-3 my-2 home-markets__card">
                    <a href="/markets/${markets_post.id}">
                        ${markets_post.title.rendered}
                    </a>
                </div>
            `);
        });
    });
}

export function populateHomeCapabilitiesSection() {
    return new Promise((resolve, reject) => {
        const { capabilities_posts } = window;
        const { capabilities } = window.home_data.acf;

        $('.home-capabilities__heading').html(capabilities.heading);
        $('.home-capabilities__content').html(capabilities.blurb);

        capabilities_posts.forEach(capabilities_post => {
            $('.home-capabilities__cards').append(`
                <div class="col-6 py-3 my-2 home-capabilities__card">
                    <a href="/capabilities/${capabilities_post.id}">
                        ${capabilities_post.title.rendered}
                    </a>
                </div>
            `);
        });
    });
}

export function populateHomeProjectsSection() {
    return new Promise((resolve, reject) => {
        const { projects_posts } = window;

        projects_posts.forEach(projects_post => {
            $('.home-projects__cards').append(`
                <div class="col-6 col-md-4 home-projects__card">
                    <a href="/projects/${projects_post.id}">
                        <img class='mb-3' src="${projects_post._embedded['wp:featuredmedia'][0].source_url}" alt="" />
                        <p>${projects_post.title.rendered}</p>
                    </a>
                </div>
            `);
        });
    });
}

export function populateHomeCareerSection() {
    return new Promise((resolve, reject) => {
        const { careers } = window.home_data.acf;

        $('.home-careers__button')
            .attr('href', careers.link_target)
            .html(careers.link_text);

        $('.home-careers__heading').html(careers.heading);
    });
}