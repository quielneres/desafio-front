import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "../user/user.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token') || 'aaaaaaaaaaaaaaaaaaaaaaaa';

    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token!),
    });

    return next.handle(request);
  }
}
