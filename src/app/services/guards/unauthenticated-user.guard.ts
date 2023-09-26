import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {UserService} from "../user/user.service";

export const unauthenticatedUserGuard: CanActivateFn = (route, state):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree=> {

  return inject(UserService).logged
    ? false
    : inject(Router).createUrlTree(['/']);
};
