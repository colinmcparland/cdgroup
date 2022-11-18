export function populateHistoryPageData() {
    return new Promise((resolve, reject) => {
    
        const { history_data } = window;

 
            const { acf, _embedded } = history_data || {};
            const { subheader, overview_title, main_content, image } = acf || {};

            $('.history__heading-subheader').html(`<div>${subheader}</div>`);
            $('.history__heading-image').css('background-image', `url(${image})`);
            $('.history__overview-title').text(overview_title);
            $('.history__overview-content').html(main_content);

    });
}