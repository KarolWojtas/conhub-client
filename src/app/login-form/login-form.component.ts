import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService, OauthTokenResponse} from "src/app/services/auth.service";
import {NgRedux, select} from "@angular-redux/store";
import { User } from "src/app/redux/user-store";
import { FormControl, Validators, AbstractControl, FormGroup } from "@angular/forms";
import {UserService} from "../services/user.service";
import {IMainState} from "../redux/main-store";
import {SET_USER} from "../redux/user-state-actions";
import {SignInDialogComponent} from "../sign-in-dialog/sign-in-dialog.component";
import {MatDialogRef} from "@angular/material";


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @select(store => store.userStore.user) user: User
  constructor(private authService: AuthService, private userService: UserService, private ngRedux: NgRedux<IMainState>) { }
  @Output('success') loginSuccess = new EventEmitter()
  ngOnInit() {
  }
  form = new FormGroup({
      username: new FormControl('', Validators.required),
      password:new FormControl('', Validators.required)
  })
  wasLoginUnsuccessful=false
  get username(){
      return this.form.get('username')
  }
  get password(){
      return this.form.get('password')
  }
  usernameValue(){
    return this.username.value
  }
  passwordValue(){
    return this.password.value
  }
  login(){
      const credentials = {username: this.usernameValue(), password: this.passwordValue()}
      this.authService.fetchToken(credentials)
          .subscribe(response => {
          this.handleLoginSuccessful(response)
      },error => {
          this.handleLoginUnsuccessful(error)
      })
  }
  handleLoginUnsuccessful(error){
      this.form.reset('', {onlySelf: true, emitEvent: false})
      this.wasLoginUnsuccessful =true
  }
  handleLoginSuccessful(response: OauthTokenResponse){
    this.userService.fetchUserInfo(this.authService.principal)
      .subscribe(user => this.ngRedux.dispatch({type: SET_USER, user: user}))
    this.loginSuccess.emit(true)
  }
}

