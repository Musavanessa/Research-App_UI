import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {


    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.auth.getAuthToken;

        if (token && req.url.includes('api/v1')) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(req);
        }
        // console.log('sending request');
        return next.handle(req);
    }

}