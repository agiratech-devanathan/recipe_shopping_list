import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from 'rxjs/operators'
import { Injectable } from "@angular/core";
@Injectable({providedIn:'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authServie: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authServie.user.pipe(take(1), exhaustMap(user => {
            if(!user){
                return next.handle(req);
            }
            const modifedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
            return next.handle(modifedReq);
        })
        );

    }
}