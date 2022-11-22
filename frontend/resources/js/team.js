export function populateTeam() {

    const { team_posts } = window;
    
    team_posts && team_posts.forEach(teamPost => {
        const { title, acf, _embedded, slug } = teamPost || {};
        const image = _embedded ? _embedded["wp:featuredmedia"][0].source_url : "";
        const { position } = acf || {};
    
        $('.team-tiles__wrapper').append(`
        
                <a href="/team/${slug}" class="team-tiles__tile px-3 mb-5 col-12 col-sm-4 col-lg-3">
                    <div class="team-tiles__tile-img" style="background-image: url(${image});"></div>
                    <small class='mt-3'>${title && title.rendered ? title.rendered : ""}</small>
                    <small>${position || ""}</small>
                </a>
    
        `);
    });
  }