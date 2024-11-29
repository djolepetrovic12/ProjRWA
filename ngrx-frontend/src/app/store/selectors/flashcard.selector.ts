import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { FlashcardState, adapter } from "../reducers/flashcard.reducer";


export const selectFlashcardsState = createFeatureSelector<AppState, FlashcardState>('flashcards');

export const SelectFlashcardsFeature = createSelector
(
    selectFlashcardsState,
    adapter.getSelectors().selectAll
);