// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  base_url: 'http://localhost:8765',
 // base_url: 'http://karolwojtas.sytes.net:8765',
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

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
