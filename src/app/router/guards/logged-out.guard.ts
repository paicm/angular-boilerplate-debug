import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthQuery } from './../../store/auth.query';
import { SiteRoutes } from '../../constants/site-routes';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(
    private _authQuery: AuthQuery,
    private _router: Router
  ) {}

  /**
   * Check is user logged in, if he is logged in
   * redirect him back to home
   * logged in user can't activate route protected by this guard
   * @param next {ActivatedRouteSnapshot}
   * @param state {RouterStateSnapshot}
   * @returns boolean
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create((observer) => {
      this._authQuery.isLoggedIn$.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this._router.navigate([SiteRoutes.HOME]);
        }
        observer.next(!isLoggedIn);
      });
    });
  }
}
