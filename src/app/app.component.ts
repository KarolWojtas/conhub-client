import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from "@angular-redux/store/lib/src";
import { User } from "src/app/redux/user-store";
import {Observable} from "rxjs";
import { AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {REMOVE_CONCERT_INTEREST, SAVE_VENUES, SET_USER} from "./redux/user-state-actions";
import {IMainState} from "./redux/main-store";
import {MatDialog} from "@angular/material";
import {SignInDialogComponent} from "./sign-in-dialog/sign-in-dialog.component";
import {MediaMatcher} from "@angular/cdk/layout";
import {VenueService} from "./content/services/venue.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'con-project';
  imageError = false
  mobileQuery: MediaQueryList
  private _mobileQueryListener: () => void;
  @select(store=>store.userState.loggedInUser.username) username: Observable<User>
  constructor(private userService: UserService, private authService: AuthService, private ngRedux: NgRedux<IMainState>,
              private dialog: MatDialog, private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef, private venueService: VenueService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.venueService.fetchVenues().subscribe( venues => this.ngRedux.dispatch({type: SAVE_VENUES, venues: venues}))
    const principal = this.authService.principal
    if(principal != null){
      this.userService.fetchUserInfo(principal)
        .subscribe(user => this.ngRedux.dispatch({type: SET_USER, user: user}))
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout(){
    this.authService.logout()
  }
  isLoggedIn(){
    return this.authService.token != null
  }
  principal(): string{
    return this.authService.principal
  }
  //TODO: USTAWIAĆ URL DO AVATARA PO PRZESŁANIU LUB LOGOWANIU LUB COŚTAM
  openSignDialog(){
    const dialogRef = this.dialog.open(SignInDialogComponent);
  }
  isAdmin(): boolean{
    if(this.authService.principalRole!=undefined){
      return this.authService.principalRole.filter(role => role == 'ROLE_ADMIN').length > 0
    }
  }

}
