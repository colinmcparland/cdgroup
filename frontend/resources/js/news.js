export function populateNewsTiles(newsSort = "newfirst", searchFilter = null) {
    return new Promise((resolve, reject) => {

        const { news_posts } = window;

        news_posts && news_posts
        .sort((a, b) => {
            if(newsSort === "oldfirst") {
                if(new Date(a.acf.date_published).getTime() > new Date(b.acf.date_published).getTime()) {
                    return 1;
                } else if(new Date(a.acf.date_published).getTime() < new Date(b.acf.date_published).getTime()) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                {
                    if(new Date(a.acf.date_published).getTime() < new Date(b.acf.date_published).getTime()) {
                        return 1;
                    } else if(new Date(a.acf.date_published).getTime() > new Date(b.acf.date_published).getTime()) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        })
        .forEach(newsPost => {
            const { acf, title, slug } = newsPost || {};
            const { preview_content, date_published } = acf || {};
            const image = newsPost && newsPost._embedded &&  newsPost._embedded['wp:featuredmedia'] &&  newsPost._embedded['wp:featuredmedia'][0] &&  newsPost._embedded['wp:featuredmedia'][0].source_url ? newsPost._embedded['wp:featuredmedia'][0].source_url : "";

            const newsIsInSearch = searchFilter === null || searchFilter === "" ? true : newsPost.title.rendered.toLowerCase().indexOf(searchFilter.toLowerCase()) > -1;

            if(newsIsInSearch) {
            $('.news-tiles__wrapper').append(`
                <a class='col-12 col-sm-6 col-lg-4' href="/news/${slug}">
                    <div class="news-tiles__tile mb-5">
                        <div class="news-tiles__tile-img" style="background-image: url(${image || ""});" ></div>
                        <h3 class='mt-3'>${title && title.rendered ? title.rendered : ""}</h3>
                        ${date_published ? `<small>${date_published}</small>` : null}
                        <p>${preview_content || ""}</p>
                    </div>
                </a>
            `);
          }
        });
    });
}

export function populateSingleNews() {
    return new Promise((resolve, reject) => {
        const { news_posts } = window;
        const thisNews = location.pathname.split('news/')[1];

        const relevantNews = news_posts.find(newstPost => newstPost.slug === thisNews);

        const { acf } = relevantNews || {};

        const {
          main_content,
          subtitle,
          date_published,
          category
        } = acf || {};

        const { title } = relevantNews || {};

        const image = relevantNews && relevantNews._embedded &&  relevantNews._embedded['wp:featuredmedia'] &&  relevantNews._embedded['wp:featuredmedia'][0] &&  relevantNews._embedded['wp:featuredmedia'][0].source_url ? relevantNews._embedded['wp:featuredmedia'][0].source_url : ""

        if(title && title.rendered) {
          $('.single-news__title').html(title.rendered);
          document.title = title.rendered.replace('#038;', '');
        }

        if(main_content) {
            $(".single-news__content").html(main_content);
        }

        if(subtitle) {
            $(".single-news__subtitle").html(subtitle);
        }

        if(category) {
            $(".single-news__category").html(category);
        }

        if(date_published) {
            $(".single-news__date").html(date_published);
        }

        if(image) {
            $(".single-news__image").css("background-image", `url(${image})`);
        }

    });

  }

  export const newsListeners = () => {
      $(".news-sort__button").click((e) => {
        if(($(e.currentTarget).hasClass("newfirst") && localStorage.getItem("news-sort") !== "newfirst") || ($(e.currentTarget).hasClass("oldfirst") && localStorage.getItem("news-sort") !== "oldfirst")) {
            $(".news-sort__button").toggleClass("selected");
            $(".news-tiles__wrapper").empty();
            localStorage.setItem("news-sort", $(e.currentTarget).hasClass("newfirst") ? "newfirst" : "oldfirst");
            populateNewsTiles(localStorage.getItem("news-sort"), localStorage.getItem("news_search_query"));
        }
    })

    $(".news-search-filter input").on("change textInput, input", (e) => {
        localStorage.setItem("news_search_query", $(e.currentTarget).val());
        $(".news-tiles__wrapper").empty();
        populateNewsTiles(localStorage.getItem("news-sort"), localStorage.getItem("news_search_query"));
    });
  }
