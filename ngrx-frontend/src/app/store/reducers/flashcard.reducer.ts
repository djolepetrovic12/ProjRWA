import { createReducer, on } from "@ngrx/store";
import { Flashcard } from "../../models/flashcard";
import * as FlashcardActions from "../actions/flashcard.actions"


export interface FlashcardState
{
    list:Flashcard[] | null;
    error:string | null;
}

export const FlashcardInitialState : FlashcardState =
{
    list: [],
    error:null
};

export const FlashcardReducer = createReducer(
    FlashcardInitialState,
    on(FlashcardActions.LoadFlashcardsSuccess,(state,{flashcards}) => ({
        ...state,
        list:flashcards,
        error:null
    })),
    on(FlashcardActions.CreateAFlashcardSuccess,(state,{flashcard}) => ({
        ...state,
        list: state.list ? [...state.list, flashcard] : [flashcard]
    })),
    on(FlashcardActions.DeleteAFlashcardSuccess, (state, { id }) => ({
        ...state,
        list: state.list ? state.list.filter(fc => fc.id !== id) : null
      })),
    on(FlashcardActions.UpdateAFlashcardSuccess, (state, { flashcard }) => ({
        ...state, list: state.list ? state.list.map(fc => fc.id === flashcard.id ? flashcard : fc) : null
    })),
    on(FlashcardActions.UpdateAFlashcardFailure, (state, { error }) => ({
        ...state,
        error
    })),      
    )

