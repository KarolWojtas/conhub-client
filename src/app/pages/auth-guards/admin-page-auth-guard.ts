import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Injectable()
export class AdminPageAuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.principalRole.filter(role => role == 'ROLE_ADMIN').length > 0){
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}
