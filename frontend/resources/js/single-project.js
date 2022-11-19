export function populateSingleProject() {
    const { projects_posts } = window;
    const thisProject = location.pathname.split('projects/')[1];
  
    const relevantProject = projects_posts && projects_posts.find(projectPost => projectPost.slug === thisProject);
  
    const { acf } = relevantProject || {};
  
    const {
      content_area_1,
      content_area_2
    } = acf || {};

  
    $('.single-project-content-area-1__top-heading').html(relevantProject && relevantProject.title && relevantProject.title.rendered ? relevantProject.title.rendered : "");
    $('.single-project-content-area-1__title').html(content_area_1 && content_area_1.title ? content_area_1.title : "");
    $('.single-project-content-area-1__content').html(content_area_1 && content_area_1.content ? content_area_1.content : "");
  
    $('.single-project-content-area-2__header').html(content_area_2 && content_area_2.header ? content_area_2.header : "");
    $('.single-project-content-area-2__title').html(content_area_2 && content_area_2.subheader ? content_area_2.subheader : "");
    $('.single-project-content-area-2__content').html(content_area_2 && content_area_2.content ? content_area_2.content : "");  
  }