import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SelectUserFeature, SelectUserRoleFeature } from '../store/selectors/user.selector';
import { AppState } from '../app.state';
//import { selectUserRole } from '../store/selectors/auth.selectors'; // Adjust selector path

@Injectable({
  providedIn: 'root'
})
export class RoleRedirectGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(SelectUserRoleFeature).pipe(
      take(1),
      map(role => {
        if (role === 'ADMIN') {
          this.router.navigate(['/studyResources']);
        } else if (role === 'PROFESSOR') {
          this.router.navigate(['/myStudyResources']);
        } else if (role === 'STUDENT') {
          this.router.navigate(['/flashcards']);
        } else {
          this.router.navigate(['/login']); // Fallback or unauthorized route
        }
        return false; // Prevent navigation to the route being guarded
      })
    );
  }
}