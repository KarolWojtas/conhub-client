import {Credentials, OauthTokenResponse, Token} from "../auth.service";
import {Observable} from "rxjs";
import {User} from "../../redux/user-store";

export class MockAuthService{
  fetchToken(credentials: Credentials): Observable<OauthTokenResponse> {
    return Observable.create((observer) => observer.next(tokenMock))
  }
  get token(){
    return tokenMock.access_token
  }
  get isTokenExpired(){
    return false
  }
  get principal(){
    return this.userPrincipal
  }

  userPrincipal: User = {
    id: 1,
    username: 'username',
    avatar: undefined
  }
}
export const tokenMock: OauthTokenResponse = {
  access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdCIsInVzZXIiXSwidXNlcl9uYW1lIjoidXNlcm5hbWUiLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTUzNjc3MTU4MSwiYXV0aG9yaXRpZXMiOlsiXCJST0xFX1VTRVJcIiJdLCJqdGkiOiI3MTc3MDA2ZC05ODYwLTRiZmItOTAxMi0xYjc0NmM3OWJhMGUiLCJjbGllbnRfaWQiOiJ3ZWJDbGllbnQifQ.Fc1YA1Pp1bccyD1YQYzKO-Ciw0BncbwM2ErXU9c_p4APcPHyQrhf1YafqrQl2WeoC_pPGVmYYOd_bF3M5QmP8dziXGk87DJ_6J0y4KHx57lS9vlGkqxU2nUz7o1al7lXxXBbYQLLJnpUdUGo-c49CocQw5RK30P9wCQZUbjLMx8JiSaN-KHn55zSX88jwY5H64keiEGub45p2nnvJjSVHdirqX5tCqPD3xfNyavkAfQw9l2Qp1ydbtrrfrEjKKcBNkS_Ub0_2RXU6YN6unc0mLHfgP1Semvmoy_6fgfHwfoBB0lii6YN_swpix-k0t7OmXHAU05BEfNukoVYaxsBOQ",
  token_type: "bearer",
  refresh_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdCIsInVzZXIiXSwidXNlcl9uYW1lIjoidXNlcm5hbWUiLCJzY29wZSI6WyJyZWFkIl0sImF0aSI6IjcxNzcwMDZkLTk4NjAtNGJmYi05MDEyLTFiNzQ2Yzc5YmEwZSIsImV4cCI6MTUzNjc2ODEwMSwiYXV0aG9yaXRpZXMiOlsiXCJST0xFX1VTRVJcIiJdLCJqdGkiOiI2OGRjY2I4NS0wZWVmLTQzZDgtOGJjZS0yNjA1NGE4Y2M2YTUiLCJjbGllbnRfaWQiOiJ3ZWJDbGllbnQifQ.MhjTqXzCrDm5hXB5r2Vrv7Ncu4o49vaHnMS3H740IR6nm9txgEydVSSDDleteTK9_bmXAeiflLVZmXI_f0GMUMODqdsvYggBrYP2aapiGSAh2nRTmlCU30ke0jgHhIWOngPNwIPEQJ8P4oNjJAkx821vuWqnzs9TRK62sM5Fcc2l9k0K56BuOjEbRl4MGdVVbk5egQVg1KLUbkdlhKGJ9NssmD7S6YuZb5Suo82qOugn0fhw1A7UcoU-9IwUjb00xuxj8AvW6ZlHH6jSj_RjWBOXzz7QH_jVx5CquRQooJxgfwlI2pV5XyQ6XRJ1UZIFARUs0N-c4EbHZKtdEi32Iw",
  expires_in: 831,
  scope: "read",
  jti: "7177006d-9860-4bfb-9012-1b746c79ba0e"
}
