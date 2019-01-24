export function populateSingleCapability() {
  const { capabilities_posts, projects_posts } = window;
  const thisCapability = location.pathname.split('capabilities/')[1];

  const relevantCapability = capabilities_posts.find(marketPost => marketPost.title.rendered.replace(/ /g, '-').toLowerCase() === thisCapability);

  const { acf } = relevantCapability;

  const {
    content_area_1,
    content_area_2,
    cta,
    featured_projects
  } = acf;

  console.log({ acf });

  const cta_project = window.projects_posts
    .find(post => post.id === parseInt(cta.featured_project_cta_select));

  $('.single-capability-content-area-1__top-heading').text(relevantCapability.title.rendered);
  $('.single-capability-content-area-1__title').text(content_area_1.title);
  $('.single-capability-content-area-1__content').html(content_area_1.content);

  $('.single-capability-content-area-2__header').text(content_area_2.header);
  $('.single-capability-content-area-2__title').text(content_area_2.subheader);
  $('.single-capability-content-area-2__content').html(content_area_2.content);

  $('.single-capability-cta__image').append(`<img src=${cta_project._embedded['wp:featuredmedia'][0].source_url} />`);
  $('.single-capability-cta__heading').text(cta.title);
  $('.single-capability-cta__content').append(`<p><strong>${cta_project.title.rendered}</strong></p>`);

  $('.single-capability-cta__project-link').attr('href', `/projects/${cta_project.title.rendered.replace(/ /g, '-').toLowerCase()}`);

  const related_projects = featured_projects
    .map(projectID => projects_posts
        .find(projectPost => projectPost.id === parseInt(projectID)) || null
    )
    .forEach(projects_post => {
      $('.single-capability-project-tiles__cards-container').append(`
          <div class="col-12 col-md-6 mb-5 home-projects__card">
              <a href="/projects/${projects_post.id}">
                  <img class='mb-3' src="${projects_post._embedded['wp:featuredmedia'][0].source_url}" alt="" />
                  <p>${projects_post.title.rendered}</p>
              </a>
          </div>
      `);
    });
}