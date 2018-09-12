import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import {  fromEvent } from "rxjs";
import { debounceTime, switchMap, tap, filter } from "rxjs/operators";
import { PasswordsValidator } from "src/app/validators/PasswordsValidator";
import { AuthService } from "src/app/services/auth.service";
import { UsernameValidator } from "src/app/validators/UsernameValidator";
import {NgRedux} from "@angular-redux/store";
import {IMainState} from "../redux/main-store";
import {SET_USER} from "../redux/user-state-actions";


@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  constructor(private userService: UserService, private authService: AuthService, private ngRedux: NgRedux<IMainState>) { }
  isUsernameUnique: boolean
  ngOnInit() {
      
      fromEvent(this.usernameInput.nativeElement, 'keydown').pipe(
              debounceTime(400),
              filter(x=>this.username.value!=null),
              filter(x=>this.username.value!=''&&!this.username.value.includes(" "))
      ).subscribe(response => 
          this.userService.fetchIsUsernameUnique(this.username.value)
          .subscribe((isUnique: boolean) => {
              if(!isUnique){
                  this.username.setErrors({ notUnique: true})
                  
              } else {
                  this.username.setErrors(null)
              }
          }))
      
  }
  @ViewChild('usernameInput') usernameInput: ElementRef;
  
  form = new FormGroup({
      username: new FormControl('', [Validators.required, UsernameValidator.noSpaces]),
      passwordGroup: new FormGroup({
          password: new FormControl('', Validators.required),
          confirmPassword: new FormControl('', Validators.required)
      }, [Validators.required, PasswordsValidator.match])
  })
  get username(){
      return this.form.get('username');
  }
  get password(){
      return this.form.get(['passwordGroup','password'])
  }
  get confirmPassword(){
      return this.form.get(['passwordGroup','confirmPassword'])
  }
  get passwordGroup(){
      return this.form.get('passwordGroup')
  }
  registerUser(){
      const user = {
              username: this.username.value,
              password: this.password.value,
              roles: 'ROLE_USER'
      }
      this.userService.fetchReqisterUser(user).subscribe(response => {
          console.log(response)
          this.authService.fetchToken({username: user.username, password: user.password})
          .subscribe(response => {
              this.form.reset('', {emitEvent:false, onlySelf:false})
          })
      })
  }
  registerUser2(){
    const user = {
      username: this.username.value,
      password: this.password.value,
      roles: 'ROLE_USER'
    }
    this.userService.fetchReqisterUser(user).pipe(
      switchMap((response) => {
        return this.authService.fetchToken({username: user.username, password: user.password})
      }),
      switchMap((response) => {

        return this.userService.fetchUserInfo(this.authService.principal)
      })
    ).subscribe(user => {
      this.ngRedux.dispatch({type: SET_USER, user: user})
    })

  }
  
}
