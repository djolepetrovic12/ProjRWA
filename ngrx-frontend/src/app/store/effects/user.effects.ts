import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Login, LoginFailure, LoginSuccess, Logout, LogoutFailed, LogoutSuccess, Register, RegisterFailure, RegisterSuccess, RehydrateAuth } from "../actions/user.action";
import { UserService } from "../../services/User/user-service.service";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { CreateAFlashcard, CreateAFlashcardFailure, CreateAFlashcardSuccess, DeleteAFlashcard, DeleteAFlashcardFailure, DeleteAFlashcardSuccess, LoadFlashcards, LoadFlashcardsFailure, LoadFlashcardsSuccess, UpdateAFlashcard, UpdateAFlashcardFailure, UpdateAFlashcardSuccess } from "../actions/flashcard.actions";
import { FlashcardService } from "../../services/Flashcard/flashcard.service";
import { Flashcard } from "../../models/flashcard";
import { CreateAStudyResource, CreateAStudyResourceFailure, CreateAStudyResourceSuccess, LoadMyStudyResources, LoadMyStudyResourcesFailure, LoadMyStudyResourcesSuccess, LoadStudyResources, LoadStudyResourcesFailure, LoadStudyResourcesSuccess } from "../actions/studyResource.actions";
import { StudyResourceService } from "../../services/StudyResource/study-resource.service";
import { StudyResource } from "../../models/studyResource";



@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private flashcardService : FlashcardService,
    private studyResourceService : StudyResourceService,
    private router:Router,
    private readonly store:Store<AppState>
  ) {}

  rehydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RehydrateAuth),
      switchMap(() =>
        this.userService.getUserFromCookie().pipe(
          map(response => {this.router.navigate(['/']);return LoginSuccess({user:response})}),
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
          map((response) =>  CreateAFlashcardSuccess({flashcard:<Flashcard>response}) ),
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

      updateAFlashcard$ = createEffect(() => 
        this.actions$.pipe(
          ofType(UpdateAFlashcard),
          switchMap(({id,formData}) => 
            this.flashcardService.updateAFlashcard(id,formData).pipe(
              map((response) =>  UpdateAFlashcardSuccess({flashcard:<Flashcard>response}) ),
              catchError((error) => of(UpdateAFlashcardFailure({ error:error })))
            )
          )
          )
        )

        createAStudyResource$ = createEffect(() => 
          this.actions$.pipe(
            ofType(CreateAStudyResource),
            switchMap(({id,formData}) => 
              this.studyResourceService.createAStudyResource(id,formData).pipe(
                map((response) =>  CreateAStudyResourceSuccess({studyResource:<StudyResource>response}) ),
                catchError((error) => of(CreateAStudyResourceFailure({ error:error })))
              )
            )
            )
          )

          loadStudyResource$ = createEffect(() => 
            this.actions$.pipe(
              ofType(LoadStudyResources),
              switchMap(() => 
                this.studyResourceService.loadStudyResources().pipe(
                  map((response) =>  LoadStudyResourcesSuccess({studyResources:<StudyResource[]>response}) ),
                  catchError((error) => of(LoadStudyResourcesFailure({ error:error })))
                )
              )
              )
            )

            loadMyStudyResource$ = createEffect(() => 
              this.actions$.pipe(
                ofType(LoadMyStudyResources),
                switchMap(({id}) => 
                  this.studyResourceService.loadMyStudyResources(id).pipe(
                    map((response) =>  LoadMyStudyResourcesSuccess({studyResources:<StudyResource[]>response}) ),
                    catchError((error) => of(LoadMyStudyResourcesFailure({ error:error })))
                  )
                )
                )
              )


}
