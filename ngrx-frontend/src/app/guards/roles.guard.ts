import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/User/user-service.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { SelectUserFeature } from '../store/selectors/user.selector';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private store:Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRoles = route.data['expectedRoles'];
    return this.store.pipe(
      select(SelectUserFeature),
      take(1),
      map((currentUser) => {
        if (currentUser && expectedRoles.includes(currentUser.role)) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  }
}