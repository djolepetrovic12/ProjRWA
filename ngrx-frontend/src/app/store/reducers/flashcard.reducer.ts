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
    on(FlashcardActions.DeleteAFlashcardSuccess, (state, { id }) => ({
        ...state,
        list: state.list ? state.list.filter(fc => fc.id !== id) : null
        //.list.filter(flashcard => flashcard.id !== id)
      })),
    /*on(UserActions.LoginSuccess, (state, { user }) => ({
        ...state,
        Iam:user,
        isAuthenticated: true,
        error: null,
      })),
    on(UserActions.LogoutSuccess, (state) => ({
        ...state,
        Iam: null,
        isAuthenticated: false,
        error: null,
    })),
    on(UserActions.LogoutFailed, (state,{error}) => ({
        ...state,
        error
    })), */     
    )

