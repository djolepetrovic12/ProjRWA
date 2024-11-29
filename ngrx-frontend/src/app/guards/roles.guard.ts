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
    console.log(expectedRoles) // Role passed in route data
    return this.store.pipe(
      select(SelectUserFeature), // Get the current user from the store
      take(1), // Take only one emission of the current user
      map((currentUser) => {
        if (currentUser && expectedRoles.includes(currentUser.role)) {
          console.log(`${currentUser.role} --- ${expectedRoles}`)
          return true; // Allow access if the user's role matches the expected role
        } else {
          this.router.navigate(['/unauthorized']); // Redirect to login if unauthorized
          return false; // Deny access if the roles don't match
        }
      })
    );
  }
}