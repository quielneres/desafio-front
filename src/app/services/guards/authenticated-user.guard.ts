import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {UserService} from "../user/user.service";

export const authenticatedUserGuard: CanActivateFn = (route, state):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree=> {

  return inject(UserService).logged
    ? true
    : inject(Router).createUrlTree(['/login']);
};
