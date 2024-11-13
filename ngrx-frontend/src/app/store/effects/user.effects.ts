import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Login, LoginFailure, LoginSuccess, Logout, LogoutFailed, LogoutSuccess, Register, RegisterFailure, RegisterSuccess } from "../actions/user.action";
import { UserService } from "../../services/User/user-service.service";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { CreateAFlashcard, CreateAFlashcardFailure, CreateAFlashcardSuccess, DeleteAFlashcard, DeleteAFlashcardFailure, DeleteAFlashcardSuccess, LoadFlashcards, LoadFlashcardsFailure, LoadFlashcardsSuccess } from "../actions/flashcard.actions";
import { FlashcardService } from "../../services/Flashcard/flashcard.service";



@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private flashcardService : FlashcardService,
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

  createAFlashcard$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CreateAFlashcard),
      switchMap(({id,formData}) => 
        this.flashcardService.createAFlashcard(id,formData).pipe(
          map((response) =>  CreateAFlashcardSuccess({message:response}) ),
          catchError((error) => of(CreateAFlashcardFailure({ error:error })))
        )
      )
      )
    )

    loadFlashcard$ = createEffect(() => 
      this.actions$.pipe(
        ofType(LoadFlashcards),
        switchMap(({id:id}) => 
          this.flashcardService.loadFlashcards(id).pipe(
            map((response) =>  LoadFlashcardsSuccess({flashcards:response}) ),
            catchError((error) => of(LoadFlashcardsFailure({ error:error })))
          )
        )
        )
      )

      deleteAFlashcard$ = createEffect(() => 
        this.actions$.pipe(
          ofType(DeleteAFlashcard),
          switchMap(({id}) => 
            this.flashcardService.deleteAFlashcard(id).pipe(
              map((response) =>  DeleteAFlashcardSuccess({id:<number>response}) ),
              catchError((error) => of(DeleteAFlashcardFailure({ error:error })))
            )
          )
          )
        )

      /*user$ = createEffect(() =>
        this.actions$.pipe(
          ofType(Login),
          switchMap(({ formData: formData }) =>
            this.userService.login(formData).pipe(
              map((response) => { this.router.navigate(['/']);return LoginSuccess({user:response})} ),
              catchError((error) => of(LoginFailure({ error:error })))
            )
          )
        )
      );*/


}
