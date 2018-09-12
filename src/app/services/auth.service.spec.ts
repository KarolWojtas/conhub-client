import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgRedux, NgReduxModule} from "@angular-redux/store";
import {componentFactoryName} from "@angular/compiler";

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, HttpClient, NgRedux],
      imports:[
        HttpClientModule,
        NgReduxModule
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  it('should get token', inject([AuthService], (service: AuthService) => {
    spyOn(localStorage, "getItem").and.returnValue(accessToken)
    const removeTokenSpy = spyOn(localStorage, 'removeItem')
    const token = service.token
    expect(removeTokenSpy).toHaveBeenCalled()
    expect(token).toBeFalsy()
  }))
});
const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdCIsInVzZXIiXSwidXNlcl9uYW1lIjoidXNlcm5hbWUiLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTUzNjc3MTU4MSwiYXV0aG9yaXRpZXMiOlsiXCJST0xFX1VTRVJcIiJdLCJqdGkiOiI3MTc3MDA2ZC05ODYwLTRiZmItOTAxMi0xYjc0NmM3OWJhMGUiLCJjbGllbnRfaWQiOiJ3ZWJDbGllbnQifQ.Fc1YA1Pp1bccyD1YQYzKO-Ciw0BncbwM2ErXU9c_p4APcPHyQrhf1YafqrQl2WeoC_pPGVmYYOd_bF3M5QmP8dziXGk87DJ_6J0y4KHx57lS9vlGkqxU2nUz7o1al7lXxXBbYQLLJnpUdUGo-c49CocQw5RK30P9wCQZUbjLMx8JiSaN-KHn55zSX88jwY5H64keiEGub45p2nnvJjSVHdirqX5tCqPD3xfNyavkAfQw9l2Qp1ydbtrrfrEjKKcBNkS_Ub0_2RXU6YN6unc0mLHfgP1Semvmoy_6fgfHwfoBB0lii6YN_swpix-k0t7OmXHAU05BEfNukoVYaxsBOQ"
