import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordsValidator} from "../validators/PasswordsValidator";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  form = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, PasswordsValidator.match)
  constructor(private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  get password(){
    return this.form.get('password')
  }
  changePassword(){
    this.userService.fetchChangePassword(this.authService.principal, this.password.value)
      .subscribe(success => {
        this.form.reset('')
        this.snackBar.open('Password changed')
      },error => {
        this.form.reset('')
        this.snackBar.open('Failed to change password')
      })
  }
}
