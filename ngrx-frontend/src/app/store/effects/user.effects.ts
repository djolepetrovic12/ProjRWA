import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Login, LoginFailure, LoginSuccess, Logout, LogoutFailed, LogoutSuccess, Register, RegisterFailure, RegisterSuccess } from "../actions/user.action";
import { UserService } from "../../services/User/user-service.service";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../../models/user";
import { Router } from "@angular/router";



@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router:Router,
    private readonly store:Store<AppState>
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
          map((response:any) => { 
            if (response && response.message === 'logout successful') {
              this.router.navigate(['/login']);
              return LogoutSuccess({ message: response.message });
            } else {
              console.log("usao sam fail");
              throw new Error('Logout failed');
              
            }
          
          } ),
          catchError((error) => of(LogoutFailed({ error:error })))
        )
      )
    )
  );

  register$ = createEffect(() => 
    this.actions$.pipe(
      ofType(Register),
      switchMap(({ formData: formData }) =>
        this.userService.register(formData).pipe(
          map((response) => { this.router.navigate(['/login']);return RegisterSuccess({message:response})} ),
          catchError((error) => of(RegisterFailure({ error:error })))
        )
      )
    )
  );

}
