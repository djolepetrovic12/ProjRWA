import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Login, LoginFailure, LoginSuccess, Logout, LogoutSuccess } from "../actions/user.action";
import { UserService } from "../../services/User/user-service.service";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../../models/user";
import { Router } from "@angular/router";



@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router:Router
  ) {}

  user$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login),
      switchMap(({ formData: formData }) =>
        this.userService.login(formData).pipe(
          map((response) => { this.router.navigate(['/']);return LoginSuccess({user:response})} ),
          catchError((error) => of(LoginFailure({ error:error })))
        )
      )
    )
  );

  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(Logout),
      switchMap(() =>
        this.userService.logout().pipe(
          map((response) => { this.router.navigate(['/login']);return LogoutSuccess({message:response})} ),
          catchError((error) => of(LoginFailure({ error:error })))
        )
      )
    )
  );

}