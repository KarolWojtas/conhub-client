import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env } from "src/environments/environment";
import { catchError, debounceTime } from "rxjs/operators";
import { AppError } from "src/app/errors/AppError";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { ServiceUnavailableError } from "src/app/errors/ServiceUnavailableError";
import {User} from "../redux/user-store";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  fetchUserInfo(username: string){
      return this.http.get<User>(env.base_url+env.user_base_url+username)
              .pipe(catchError((error: HttpErrorResponse) => {
                  switch(error.status){
                  case 503: throw new ServiceUnavailableError("Service unavailable")
                  default: throw new AppError()
                  }
              }))
  }
  fetchIsUsernameUnique(username: string){
      return this.http.get(env.base_url+env.check_username_unique_url+username).pipe(
              this.handleError
      )
  }
  fetchRegisterUser(user: RegistrationCredentials){
      const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')
      return this.http.post(env.base_url+env.user_base_url, user,)//{headers: headers,responseType:'text'})
  }
  fetchPostAvatar(blobImage: Blob,imageName: string, username: string){
    const fd = new FormData();
    fd.append('image', blobToFile(blobImage, imageName) );
    return this.http.post(env.base_url+env.user_base_url+username+env.user_avatar, fd, {reportProgress: true, observe: "events"})
  }
  fetchChangePassword(username: string, newPassword: string){
    return this.http.patch(env.base_url+env.user_base_url+username,{password: newPassword})
  }
  handleError = catchError((error: HttpErrorResponse) => {
      switch(error.status){
      case 503: throw new ServiceUnavailableError("Service unavailable")
      default: throw new AppError()
      }
  })
}
export interface RegistrationCredentials{
    username: string,
    password: string,
    roles: string
}
export const blobToFile = (theBlob: Blob, fileName:string): File => {
  let b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = fileName;

  return <File>theBlob;
}
