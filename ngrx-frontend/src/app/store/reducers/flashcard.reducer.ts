import { createReducer, on } from "@ngrx/store";
import { Flashcard } from "../../models/flashcard";
import * as FlashcardActions from "../actions/flashcard.actions"
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


export interface FlashcardState extends EntityState<Flashcard>
{
    error:string | null;
}

export const adapter: EntityAdapter<Flashcard> = createEntityAdapter<Flashcard>();

export const FlashcardInitialState : FlashcardState = adapter.getInitialState({
    error: null,
  });


export const FlashcardReducer = createReducer(
    FlashcardInitialState,
    on(FlashcardActions.LoadFlashcardsSuccess,(state,{flashcards}) =>
        adapter.setAll(flashcards, { ...state, error: null })
    ),
    on(FlashcardActions.CreateAFlashcardSuccess,(state,{flashcard}) => 
        adapter.addOne(flashcard, state)
    ),
    on(FlashcardActions.DeleteAFlashcardSuccess, (state, { id }) => 
        adapter.removeOne(id, state)
      ),
    on(FlashcardActions.UpdateAFlashcardSuccess, (state, { flashcard }) => 
        adapter.updateOne({ id: flashcard.id, changes: flashcard }, state)
    ),
    on(FlashcardActions.UpdateAFlashcardFailure, (state, { error }) => ({
        ...state,
        error
    })),      
    )

