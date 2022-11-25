export const populateJoinOurTeam = () => {
    return new Promise((resolve, reject) => {
        const { join_our_team_data } = window;
        const { acf } = join_our_team_data;
        const { header, main_content, hero_image } = acf;


        if(hero_image) {
            $(".join-our-team__hero").css("background-image", `url(${hero_image})`);
        }

        if(header) {
            $(".join-our-team__header").text(header);
        }

        if(main_content) {
            $(".join-our-team__content").html(main_content);
        }

        const { markets_posts } = window;

        if(markets_posts) {
            markets_posts.map(post => $(".join-our-team form select[name='expertise']").append(`<option value=${post.title.rendered}>${post.title.rendered}</option>`));
        }
    });
};
