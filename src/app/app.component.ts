import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from "@angular-redux/store/lib/src";
import { User } from "src/app/redux/user-store";
import {Observable} from "rxjs";
import { AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {SET_USER} from "./redux/user-state-actions";
import {IMainState} from "./redux/main-store";
import { environment as env} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'con-project';
  imageError = false
  @select(store=>store.userState.loggedInUser.username) username: Observable<User>
  constructor(private userService: UserService, private authService: AuthService, private ngRedux: NgRedux<IMainState>){}
  ngOnInit(): void {
    const principal = this.authService.principal
    if(principal != null){
      this.userService.fetchUserInfo(principal)
        .subscribe(user => this.ngRedux.dispatch({type: SET_USER, user: user}))
    }

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
}
