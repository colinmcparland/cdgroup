
export function populateProjectsContentArea1() {
    return new Promise((resolve, reject) => {
        //  Populate the dang content area
        const { content_area_1 } = window.projects_data.acf || {};

        $('.projects-content-area-1__title').html(content_area_1 && content_area_1.title ? content_area_1.title : "");
        $('.projects-content-area-1__content').html(content_area_1 && content_area_1.content ? content_area_1.content : "");
        $('.projects-content-area-1__content').prepend(`<h2 class="projects-content-area-1__heading">${content_area_1 && content_area_1.header ? content_area_1.header : ""}</h2>`);
    });
}

export function populateProjectsTiles(market = null, capability = null, searchQuery = null) {
    return new Promise((resolve, reject) => {
    
        const { projects_posts } = window;

        const sort = localStorage.getItem('projects-sort');

        projects_posts && projects_posts
        .sort((a, b) => {
            if(sort === "az") {
                if(a.title.rendered > b.title.rendered) {
                    return 1;
                } if(a.title.rendered < b.title.rendered) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                if(a.title.rendered < b.title.rendered) {
                    return 1;
                } if(a.title.rendered > b.title.rendered) {
                    return -1;
                } else {
                    return 0;
                }
            }
        })
        .forEach(projectPost => {
            const { acf } = projectPost || {};
            const { preview_content } = acf || {};
            const { content, image } = preview_content || {};
            const { title, slug } = projectPost || {};

            // If we passed a market or capability filter, get the market or capability post and check if this post is featured
            const marketPost = window.markets_posts.find(marketPost => marketPost.title.rendered.replace("#038;", "") === market);
            const marketProjects = marketPost && marketPost.acf.featured_projects ? marketPost.acf.featured_projects : null;

            const capabilityPost = window.capabilities_posts.find(capabilityPost => capabilityPost.title.rendered.replace("#038;", "") === capability);
            const capabilityProjects = capabilityPost && capabilityPost.acf.featured_projects ? capabilityPost.acf.featured_projects : null;

            const projectIsInMarket = market === "All Markets" || market === null ? true : marketProjects ?  marketProjects.findIndex(marketProject => parseInt(marketProject) === projectPost.id) > -1 : false;
            const projectIsInCapability = capability === "All Capabilities" || capability === null ? true : capabilityProjects ?  capabilityProjects.findIndex(capabilityProject => parseInt(capabilityProject) === projectPost.id) > -1 : false;

            const projectIsInSearch = searchQuery === null || searchQuery === "" ? true : projectPost.title.rendered.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

            if(projectIsInMarket && projectIsInCapability && projectIsInSearch) {
            $('.projects-tiles__wrapper').append(`
                <a class='col-12 col-sm-6 col-lg-4' href="/projects/${slug}">
                    <div class="projects-tiles__tile mb-5">
                        <div class="projects-tiles__tile-img" style="background-image: url(${image || ""});"  />
                          
                        <h3 class='mt-3'>${title && title.rendered ? title.rendered : ""}</h3>
                        <p>${content || ""}</p>
                    </div>
                </a>
            `);
            }
        });
    });
}

export function populateFilters() {
    return new Promise((resolve, reject) => {
        const { markets_posts, capabilities_posts } = window;

        // Set the selected filter as all markets posts
        $(".markets-select .dropdown-placeholder").append(`<div>All Markets</div>`);
        $(".capabilities-select .dropdown-placeholder").append(`<div>All Capabilities</div>`);

        markets_posts && [{slug: "all", title: {rendered: "All Markets"}}, ...markets_posts].forEach((post, index) => post && post.title && post.title.rendered && $(".markets-options").append(`<div data-marketslug=${post.slug || ""} class="col-12 p-3 ${index === 0 && "selected-option"}">${post.title.rendered}</div>`));

        capabilities_posts && [{slug: "all", title: {rendered: "All Capabilities"}}, ...capabilities_posts].forEach((post, index) => post && post.title && post.title.rendered && $(".capabilities-options").append(`<div data-capabilitieslug=${post.slug || ""} class="col-12 p-3 ${index === 0 && "selected-option"}">${post.title.rendered}</div>`));


    });
}

export function projectFilterListeners() {
        $('.filter-button').click(() => {
            $('.filter-button').toggleClass('selected');
            $(".projects-filters").toggleClass('hidden');
        });

        $('.search-button').click(() => {
            $('.search-button').toggleClass('selected');
            $(".search-filter").toggleClass('hidden');
        });

        $('.markets-select').click(() => {
            $('.markets-select .bi-caret-down-fill').toggleClass('hidden');
            $(".markets-select .bi-caret-up-fill").toggleClass('hidden');
            $('.markets-options').toggleClass('hidden');
        })

        $('.capabilities-select').click(() => {
            $('.capabilities-select .bi-caret-down-fill').toggleClass('hidden');
            $(".capabilities-select .bi-caret-up-fill").toggleClass('hidden');
            $('.capabilities-options').toggleClass('hidden');
        })

        $(".markets-options > div").click(e => {
         
            $(".markets-options > div").removeClass("selected-option");
            $(e.currentTarget).addClass('selected-option');
            $(".markets-select .dropdown-placeholder").html(`<div>${$(e.currentTarget).html()}</div>`);
            $('projects-filters__selected-filters').append(`<div class="col-12>${$(e.currentTarget).text()}</div>`);

            localStorage.setItem("markets_filter", $(e.currentTarget).text());

            $(".projects-tiles__wrapper").empty();
            populateProjectsTiles(localStorage.getItem("markets_filter"), localStorage.getItem("capabilities_filter"));
        })

        $(".capabilities-options > div").click(e => {
         
            $(".capabilities-options > div").removeClass("selected-option");
            $(e.currentTarget).addClass('selected-option');
            $(".capabilities-select .dropdown-placeholder").html(`<div>${$(e.currentTarget).html()}</div>`);
            $('projects-filters__selected-filters').append(`<div class="col-12>${$(e.currentTarget).text()}</div>`);

            localStorage.setItem("capabilities_filter", $(e.currentTarget).text());

            $(".projects-tiles__wrapper").empty();
            populateProjectsTiles(localStorage.getItem("markets_filter"), localStorage.getItem("capabilities_filter"));
        })

        $(".search-filter input").on("change textInput, input", (e) => {
            localStorage.setItem("projects_search_query", $(e.currentTarget).val());
            $(".projects-tiles__wrapper").empty();
            populateProjectsTiles(localStorage.getItem("markets_filter"), localStorage.getItem("capabilities_filter"), localStorage.getItem("projects_search_query"));
        });

        $(".sort-button-az").click((e) => {
            if(localStorage.getItem("projects-sort") !== "az") {
                localStorage.setItem("projects-sort", "az");
                $(e.currentTarget).toggleClass("selected");
                $(".sort-button-za").toggleClass("selected");
                $(".projects-tiles__wrapper").empty();
                populateProjectsTiles(localStorage.getItem("markets_filter"), localStorage.getItem("capabilities_filter"), localStorage.getItem("projects_search_query"));
            }
        })

        $(".sort-button-za").click((e) => {
            if(localStorage.getItem("projects-sort") !== "za") {
                localStorage.setItem("projects-sort", "za");
                $(e.currentTarget).toggleClass("selected");
                $(".sort-button-az").toggleClass("selected");
                $(".projects-tiles__wrapper").empty();
                populateProjectsTiles(localStorage.getItem("markets_filter"), localStorage.getItem("capabilities_filter"), localStorage.getItem("projects_search_query"));
            }
        })

}
