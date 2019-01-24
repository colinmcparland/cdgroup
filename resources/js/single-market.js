export function populateSingleMarket() {
  const { markets_posts, projects_posts } = window;
  const thisMarket = location.pathname.split('markets/')[1];

  const relevantMarket = markets_posts.find(marketPost => marketPost.title.rendered.replace(/ /g, '-').toLowerCase() === thisMarket);

  const { acf } = relevantMarket;

  const {
    content_area_1,
    content_area_2,
    cta,
    featured_projects
  } = acf;

  const cta_project = window.projects_posts
    .find(post => post.id === parseInt(cta.featured_project_cta_select));

  $('.single-market-content-area-1__top-heading').text(relevantMarket.title.rendered);
  $('.single-market-content-area-1__title').text(content_area_1.title);
  $('.single-market-content-area-1__content').html(content_area_1.content);

  $('.single-market-content-area-2__header').text(content_area_2.header);
  $('.single-market-content-area-2__title').text(content_area_2.subheader);
  $('.single-market-content-area-2__content').html(content_area_2.content);

  $('.single-market-cta__image').append(`<img src=${cta_project._embedded['wp:featuredmedia'][0].source_url} />`);
  $('.single-market-cta__heading').text(cta.title);
  $('.single-market-cta__content').append(`<p><strong>${cta_project.title.rendered}</strong></p>`);

  $('.single-market-cta__project-link').attr('href', `/projects/${cta_project.title.rendered.replace(/ /g, '-').toLowerCase()}`);

  const related_projects = featured_projects
    .map(projectID => projects_posts
        .find(projectPost => projectPost.id === parseInt(projectID)) || null
    )
    .forEach(projects_post => {
      $('.single-market-project-tiles__cards-container').append(`
          <div class="col-12 col-md-6 mb-5 home-projects__card">
              <a href="/projects/${projects_post.id}">
                  <img class='mb-3' src="${projects_post._embedded['wp:featuredmedia'][0].source_url}" alt="" />
                  <p>${projects_post.title.rendered}</p>
              </a>
          </div>
      `);
    });


}