
export function populateAboutContentArea1() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { content_area_1 } = window.about_data.acf || {};

        $('.about-content-area-1__top-heading').html(content_area_1 && content_area_1.heading ? content_area_1.heading : "");
        $('.about-content-area-1__title').html(content_area_1 && content_area_1.title ? content_area_1.title : "");
        $('.about-content-area-1__content').html(content_area_1 && content_area_1.content ? content_area_1.content : "");
        $('.about-content-area-1__content').prepend(`<h2 class="about-content-area-1__heading">${content_area_1 && content_area_1.content_heading ? content_area_1.content_heading : ""}</h2>`);
    });
}

export function populateAboutCTA() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { cta_1 } = window.about_data.acf || {};

        $('.about-cta__heading').html(cta_1 && cta_1.heading ? cta_1.heading : "");
        $('.about-cta__image').append(`<img src=${cta_1 && cta_1.image ? cta_1.image : ""} />`);
        $('.about-cta__button').html(cta_1 && cta_1.button_text ? cta_1.button_text : "");
        $('.about-cta__button').attr('href', cta_1 && cta_1.button_link ? cta_1.button_link : "");
    });
}

export function populateAboutContentArea2() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { content_area_2 } = window.about_data.acf || {};

        $('.about-content-area-2__heading').html(content_area_2 && content_area_2.heading ? content_area_2.heading : "");
        $(`<p>${content_area_2 && content_area_2.content ? content_area_2.content : ""}</p>`).insertAfter($('.about-content-area-2__heading'));
        $('.about-content-area-2__image').append(`<img src=${content_area_2 && content_area_2.image ? content_area_2.image : ""} />`);
        $('.about-content-area-2__button').html(content_area_2 && content_area_2.button_text ? content_area_2.button_text : "");
        $('.about-content-area-2__button').attr('href', content_area_2 && content_area_2.button_link && content_area_2.button_link.url ? content_area_2.button_link.url : "");
        console.log(content_area_2.button_link );
    });
}


export function populateAboutContentArea3() {
    return new Promise((resolve, reject) => {
        const { content_area_3 } = window.about_data.acf || {};

        $('.about-content-area-3__button')
            .attr('href', content_area_3 && content_area_3.button_target ? content_area_3.button_target : "")
            .html(content_area_3 && content_area_3.button_text ? content_area_3.button_text : "");

        $('.about-content-area-3__heading').html(content_area_3 && content_area_3.heading ? content_area_3.heading : "");
    });
}