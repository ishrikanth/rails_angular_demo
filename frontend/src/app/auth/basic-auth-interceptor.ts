import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let token = (localStorage.getItem('TOKEN'));
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Basic ${token}"
                }
            });
        }

        return next.handle(request);
    }
}
