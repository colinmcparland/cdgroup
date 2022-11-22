export function populateSingleMarket() {
  const { markets_posts, projects_posts } = window;
  const thisMarket = location.pathname.split('markets/')[1];

  const relevantMarket = markets_posts.find(marketPost => marketPost.slug === thisMarket);

  const { acf } = relevantMarket || {};

  const {
    content_area_1,
    content_area_2,
    cta,
    featured_projects
  } = acf || {};

  const cta_project = cta && window.projects_posts
    .find(post => post.id === parseInt(cta.featured_project_cta_select));

  if(relevantMarket) {
    $('.single-market-content-area-1__top-heading').html(relevantMarket.title.rendered);
  }

  if(content_area_1) {
    $('.single-market-content-area-1__title').html(content_area_1.title || "");
    $('.single-market-content-area-1__content').html(content_area_1.content || "");
  }

  if(content_area_2) {
    $('.single-market-content-area-2__header').html(content_area_2.header || "");
    $('.single-market-content-area-2__title').html(content_area_2.subheader || "");
    $('.single-market-content-area-2__content').html(content_area_2.content || "");
  }
  
  if(!content_area_2 || (!content_area_2.subheader && !content_area_2.header && !content_area_2.content)) {
    $('.single-market-content-area-2').hide();
  }

  if(cta_project) {
    $('.single-market-cta__image').append(`<img src=${cta_project && cta_project._embedded && cta_project._embedded['wp:featuredmedia'] && cta_project._embedded['wp:featuredmedia'][0] && cta_project._embedded['wp:featuredmedia'][0].source_url ? cta_project._embedded['wp:featuredmedia'][0].source_url : ""} />`);
  }

  if(cta && cta.title) {
    $('.single-market-cta__heading').html(cta.title);
  }

  const related_projects = featured_projects && featured_projects
    .map(projectID => projects_posts
        .find(projectPost => projectPost.id === parseInt(projectID)) || null
    )
    .forEach(projects_post => {
      $('.single-market-project-tiles__cards-container').append(`
          <div class="col-12 col-md-6 mb-5 home-projects__card">
              <a href="/projects/${projects_post && projects_post.slug ? projects_post.slug : "#"}">
              <div style="background-image: url(${projects_post && projects_post._embedded &&  projects_post._embedded['wp:featuredmedia'] &&  projects_post._embedded['wp:featuredmedia'][0] &&  projects_post._embedded['wp:featuredmedia'][0].source_url ? projects_post._embedded['wp:featuredmedia'][0].source_url : ""});" class="project-image-container"></div>
                  <p>${projects_post && projects_post.title && projects_post.title.rendered ? projects_post.title.rendered : ""}</p>
              </a>
          </div>
      `);
    });


}