export function populateContactTiles() {
    return new Promise((resolve, reject) => {
    
        const { contact_posts } = window;

        contact_posts && contact_posts.forEach(contactPost => {
            const { acf, _embedded, title } = contactPost || {};
            const { address, fax_number, telephone_number } = acf || {};
            const image = _embedded ? _embedded["wp:featuredmedia"][0].source_url : "";

            $('.contact-tiles__wrapper').append(`
                <div class='col-12 col-sm-6 col-lg-4'>
                    <div class="contact-tiles__tile px-3 mb-5">
                        <div class="contact-tiles__tile-img" style="background-image: url(${image || ""});" />
                            
                        <p class='mt-3 contact-tiles__tile-title'>${title && title.rendered ? title.rendered : ""}</p>
                        <p>${address || ""}</p>
                        <p><span class="mr-2 contact-tiles__tile-number">T</span>${telephone_number || ""}</p>
                        <p><span class="mr-2 contact-tiles__tile-number">F</span>${fax_number || ""}</p>
                    </div>
                </div>
            `);
        });
    });
}

export function populateContactPageData() {
    return new Promise((resolve, reject) => {
    
        const { contact_data } = window;

 
            const { acf } = contact_data || {};
            const { form_header, form_subheader, form_blurb } = acf || {};

            $('.contact-us__form-title').text(form_header);
            $('.contact-us__form-subtitle').text(form_subheader);
            $('.contact-us__form-content').text(form_blurb);

    });
}