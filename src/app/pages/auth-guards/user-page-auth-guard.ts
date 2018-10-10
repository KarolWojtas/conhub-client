import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {select} from "@angular-redux/store";
import {map, tap} from "rxjs/operators";
import {EMPTY_USER} from "../../redux/user-store";
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../../services/auth.service";
@Injectable()
export class UserPageAuthGuard implements CanActivate{
  constructor(private snackBar: MatSnackBar, private authService: AuthService){}
  @select(store => store.userState.loggedInUser) user
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.principal != undefined){
      return true
    } else {
      this.snackBar.open('You have to login first')
      return false
    }
  }
}
