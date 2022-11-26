export function populateSingleTeam() {
    const { team_posts } = window;
    const thisTeamMember = window.location.pathname.split('team/')[1];

    const relevantTeamMember = team_posts.find(teamPost => teamPost.slug === thisTeamMember);

    const { acf, _embedded, title } = relevantTeamMember || {};

    const {
      position,
      location,
      telephone,
      email,
      main_content
    } = acf || {};

    const image = _embedded ? _embedded["wp:featuredmedia"][0].source_url : "";

    $(".team-member__sidebar-image").attr('src', image);

    $('.team-member__sidebar-location').text(location || "");
    $('.team-member__sidebar-telephone').text(telephone || "");
    $('.team-member__sidebar-email').text(email || "");

    $('.team-member__content-title').text(title && title.rendered ? title.rendered : "");
    $('.team-member__content-position').text(position || "");
    $('.team-member__content-content').html(main_content || "");

    if(title.rendered) {
      document.title = title.rendered.replace('#038;', '');
    }

}
