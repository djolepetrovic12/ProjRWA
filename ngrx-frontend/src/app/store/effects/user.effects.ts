import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeleteUser, DeleteUserFailure, DeleteUserSuccess, LoadAllUsers, LoadAllUsersFailure, LoadAllUsersSuccess, Login, LoginFailure, LoginSuccess, Logout, LogoutFailed, LogoutSuccess, Register, RegisterFailure, RegisterSuccess, RehydrateAuth, UpdateUser, UpdateUserFailure, UpdateUserSuccess } from "../actions/user.action";
import { UserService } from "../../services/User/user-service.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { User } from "../../models/user";
import { Router } from "@angular/router";




@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router:Router,
  ) {}

  rehydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RehydrateAuth),
      switchMap(() =>
        this.userService.getCurrentUser().pipe(
          map(response => {this.router.navigate(['/']);return LoginSuccess({user:<User>response})}),
          catchError((error) => of(LoginFailure({ error })))
        )
      )
    )
  );

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
      tap(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.clear();
        }
      }),
      switchMap(() =>
        this.userService.logout().pipe(
          map((response:any) => { 
            if (response && response.message === 'logout successful') {
              this.router.navigate(['/login']);
              return LogoutSuccess({ message: response.message });
            } else {
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

  loadAllUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LoadAllUsers),
      switchMap(({userID}) => 
        this.userService.getAllUsers(userID).pipe(
          map((response) =>  LoadAllUsersSuccess({users:<User[]>response}) ),
          catchError((error) => of(LoadAllUsersFailure({ error:error })))
        )
      )
      )
    )

    deleteUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(DeleteUser),
        switchMap(({id}) => 
          this.userService.deleteUser(id).pipe(
            map((response) =>  DeleteUserSuccess({id: <number>response}) ),
            catchError((error) => of(DeleteUserFailure({ error:error })))
          )
        )
        )
      )

      updateUser$ = createEffect(() => 
        this.actions$.pipe(
          ofType(UpdateUser),
          switchMap(({id,formData}) => 
            this.userService.updateUser(id,formData).pipe(
              map((response) =>  UpdateUserSuccess({user: <User>response})),
              catchError((error) => of(UpdateUserFailure({ error:error })))
            )
          )
          )
        )


                        


}
