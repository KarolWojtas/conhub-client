import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment as env } from "src/environments/environment";
import { catchError, tap } from 'rxjs/operators';
import { AuthError } from "src/app/errors/AuthError";
import { NgRedux } from "@angular-redux/store/lib/src";
import {SET_USER, UNSET_USER} from "src/app/redux/user-state-actions";
import { IMainState } from "src/app/redux/main-store";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clientId = 'webClient'
  basicAuth = 'Basic '+btoa(this.clientId+':')
  jwtHelper = new JwtHelperService()
  
  constructor(private http: HttpClient, private ngRedux: NgRedux<IMainState>) { }
  
  fetchToken(credentials: Credentials){
      const params = new URLSearchParams();
      
      params.append('username', credentials.username)
      params.append('password', credentials.password)
      params.append('grant_type', 'password')
      const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': this.basicAuth
      })

      const options ={headers: headers}
      return this.http.post<OauthTokenResponse>(env.base_url+env.token_url, params.toString(), options).pipe(
              catchError(error => {throw new AuthError("Login unsuccessful")}),
              tap(token => localStorage.setItem('token', token.access_token))
          )
  }
  public logout(){
    localStorage.removeItem('token')
    this.ngRedux.dispatch({type: UNSET_USER})
  }
  get token(){
      const token = localStorage.getItem('token')
      if(token != null){
          if(!this.jwtHelper.isTokenExpired(token, 5)){
              return token
          } else {
              localStorage.removeItem('token')
          }
      } else {
          return undefined
      }
  }
  get isTokenExpired(){
      return this.jwtHelper.isTokenExpired(this.token, 5)
  }
  get principal(){
      return (this.jwtHelper.decodeToken(this.token) as Token).user_name
  }
  
}

export interface Credentials{
    username: string,
    password: string
}
export interface OauthTokenResponse {
    access_token: string,
    expires_in: number,
    jti: string,
    refresh_token?:string,
    scope:string,
    token_type:string
}
export interface Token {
  user_name: string
  exp: Date
  authorities: string[]
}

