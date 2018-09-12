import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if(req.headers.has('Authorization')){
            return next.handle(req); 
        } else if (this.authService.token != undefined){
            const request = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${this.authService.token}`
                }
            });
            
            return next.handle(request);
        } else {
            return next.handle(req)
        }
    }
    
}