export function populateCapabilities() {
  //  Populate the dang content area
  const { content_area_1 } = window.capabilities_data.acf || {};

  $('.capabilities-content-area-1__title').html(content_area_1 && content_area_1.title ? content_area_1.title : "");
  $('.capabilities-content-area-1__content').html(content_area_1 && content_area_1.content ? content_area_1.content : "");
  $('.capabilities-content-area-1__content').prepend(`<h2 class="capabilities-content-area-1__heading">${content_area_1 && content_area_1.header ? content_area_1.header : ""}</h2>`);

  const { capabilities_posts } = window;

  capabilities_posts && capabilities_posts.forEach(capabilitiesPost => {
      const { acf } = capabilitiesPost || {};
      const { preview_content } = acf || {};
      const { content, image } = preview_content || {};
      const { title, slug } = capabilitiesPost || {};

      $('.capabilities-tiles__wrapper').append(`
          <a class='col-12 col-sm-6 col-lg-4' href="/capabilities/${slug || ""}">
              <div class="capabilities-tiles__tile px-3 mb-5">
                  <div class="capabilities-tiles__tile-img" style="background-image: url(${image || ""});"></div>
                  <h3 class='mt-3'>${title && title.rendered ? title.rendered : ""}</h3>
                  <p>${content || ""}</p>
              </div>
          </a>
      `);
  });
}
