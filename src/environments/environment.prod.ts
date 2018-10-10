export const environment = {
  production: true,
  base_url: 'http://karolwojtas.sytes.net:8765',
  token_url: '/uaa/oauth/token',
  user_base_url: '/users/',
  check_username_unique_url: '/users/checkusername/',
  user_avatar: '/avatar',
  change_username: '/changeusername/',
  concerts: {
    base_url: '/content/concerts',
    comment: {
      getAll : (concertId: string) => environment.base_url+environment.concerts.base_url+`/${concertId}/comments`,
      post : (concertId: string, username: string) => `${environment.base_url+environment.concerts.base_url}/${concertId}/comments/${username}`,
      delete: (commentId: string, username: string) => `${environment.base_url+environment.concerts.base_url}/comments/${commentId}/${username}`,
      sse: () => environment.base_url+environment.concerts.base_url+`/comments-sse`
    }
  },
  venues : {
    base_url: '/content/venues',
    avatar: (venueId: string) => `${environment.base_url+environment.venues.base_url}/${venueId}/avatar`
  },
  interests: {
    base_url: (username: string) => `${environment.base_url}/content/interests/${username}`
  }
};
