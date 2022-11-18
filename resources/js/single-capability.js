export function populateSingleCapability() {
  const { capabilities_posts, projects_posts } = window;
  const thisCapability = location.pathname.split('capabilities/')[1];

  const relevantCapability = capabilities_posts && capabilities_posts.find(marketPost => marketPost.slug === thisCapability);

  const { acf } = relevantCapability || {};

  const {
    content_area_1,
    featured_projects
  } = acf || {};

  // const cta_project = window.projects_posts && window.projects_posts
  //   .find(post => post.id === parseInt(cta.featured_project_cta_select));

  if(relevantCapability && relevantCapability.title && relevantCapability.title.rendered) {
    $('.single-capability-content-area-1__top-heading').html(relevantCapability.title.rendered);
  }

  if(content_area_1 && content_area_1.title) {
    $('.single-capability-content-area-1__title').html(content_area_1.title);
  }

  if(content_area_1 && content_area_1.content) {
    $('.single-capability-content-area-1__content').html(content_area_1.content);
  }

  // if(content_area_2 && content_area_2.header) {
  //   $('.single-capability-content-area-2__header').html(content_area_2.header);
  // }

  // if(content_area_2 && content_area_2.subheader) {
  //   $('.single-capability-content-area-2__title').html(content_area_2.subheader);
  // }

  // if(content_area_2 && content_area_2.content) {
  //   $('.single-capability-content-area-2__content').html(content_area_2.content);
  // }

  // $('.single-capability-cta__image').append(`<img src=${cta_project && cta_project._embedded ? cta_project._embedded['wp:featuredmedia'][0].source_url : ""} />`);
  // $('.single-capability-cta__heading').html(cta && cta.title ? cta.title : "");
  // $('.single-capability-cta__content').append(`<p><strong>${cta_project && cta_project.title && cta_project.title.rendered ? cta_project.title.rendered : ""}</strong></p>`);

  // if(cta_project && cta_project.title && cta_project.title.rendered) {
  //   $('.single-capability-cta__project-link').attr('href', `/projects/${cta_project.slug}`);

  // }

  const related_projects = featured_projects && featured_projects
    .map(projectID => projects_posts
        .find(projectPost => projectPost.id === parseInt(projectID)) || null
    )
    .forEach(projects_post => {
      $('.single-capability-project-tiles__cards-container').append(`
          <div class="col-12 col-md-6 mb-5 home-projects__card">
              <a href="/projects/${projects_post && projects_post.slug ? projects_post.slug : "#"}">
              <div style="background-image: url(${projects_post && projects_post._embedded &&  projects_post._embedded['wp:featuredmedia'] &&  projects_post._embedded['wp:featuredmedia'][0] &&  projects_post._embedded['wp:featuredmedia'][0].source_url ? projects_post._embedded['wp:featuredmedia'][0].source_url : ""});" class="project-image-container"></div>
                  <p>${projects_post && projects_post.title && projects_post.title.rendered ? projects_post.title.rendered : ""}</p>
              </a>
          </div>
      `);
    });
}