import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CreateAFlashcard, CreateAFlashcardFailure, CreateAFlashcardSuccess, DeleteAFlashcard, DeleteAFlashcardFailure, DeleteAFlashcardSuccess, LoadFlashcards, LoadFlashcardsFailure, LoadFlashcardsSuccess, UpdateAFlashcard, UpdateAFlashcardFailure, UpdateAFlashcardSuccess } from "../actions/flashcard.actions";
import { FlashcardService } from "../../services/Flashcard/flashcard.service";
import { Flashcard } from "../../models/flashcard";


@Injectable()
export class FlashcardEffects {
  constructor(
    private actions$: Actions,
    private flashcardService : FlashcardService,
  ) {}

  

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



}
