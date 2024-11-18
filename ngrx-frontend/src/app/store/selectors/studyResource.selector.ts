import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { StudyResourceState } from "../reducers/studyResource.reducer";


export const selectStudyResourcesState = createFeatureSelector<AppState, StudyResourceState>('studyResources');

export const SelectStudyResourcesFeature = createSelector
(
    selectStudyResourcesState,
    (state) => state.list
);

export const SelectMyStudyResourcesFeature = createSelector
(
    selectStudyResourcesState,
    (state) => state.myList
);
