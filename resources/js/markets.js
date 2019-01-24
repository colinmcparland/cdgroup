
export function populateMarketsContentArea1() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { content_area_1 } = window.markets_data.acf;

        $('.markets-content-area-1__title').html(content_area_1.title);
        $('.markets-content-area-1__content').html(content_area_1.content);
        $('.markets-content-area-1__content').prepend(`<h2 class="markets-content-area-1__heading">${content_area_1.header}</h2>`);
    });
}

export function populateMarketsTiles() {
    return new Promise((resolve, reject) => {
    
        const { markets_posts } = window;

        markets_posts.forEach(marketPost => {
            const { acf } = marketPost;
            const { preview_content } = acf;
            const { content, image } = preview_content;
            const { title } = marketPost;

            $('.markets-tiles__wrapper').append(`
                <a class='col-12 col-sm-6 col-md-4' href="/markets/${title.rendered.replace(/ /g, '-').toLowerCase()}">
                    <div class="markets-tiles__tile px-3 mb-5">
                        <div class="markets-tiles__tile-img">
                            <img src="${image}" alt="Markets Preview Image" />
                        </div>
                        <h3 class='mt-3'>${title.rendered}</h3>
                        <p>${content}</p>
                    </div>
                </a>
            `);
        });
    });
}
