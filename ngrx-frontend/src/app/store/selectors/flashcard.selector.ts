import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { FlashcardState } from "../reducers/flashcard.reducer";


export const selectFlashcardsState = createFeatureSelector<AppState, FlashcardState>('flashcards');

export const SelectFlashcardsFeature = createSelector
(
    selectFlashcardsState,
    (state) => state.list
);