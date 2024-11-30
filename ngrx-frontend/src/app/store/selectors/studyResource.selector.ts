import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { myStudyResourceAdapter, MyStudyResourceState, studyResourceAdapter, StudyResourceState } from "../reducers/studyResource.reducer";



export const selectStudyResourcesState = createFeatureSelector<AppState, StudyResourceState>('studyResources');
export const selectMyStudyResourcesState = createFeatureSelector<AppState, MyStudyResourceState>('myStudyResources');

const {
    selectAll: selectAllStudyResources,
  } = studyResourceAdapter.getSelectors();
  
  const {
    selectAll: selectAllMyStudyResources,
  } = myStudyResourceAdapter.getSelectors();

export const SelectStudyResourcesFeature = createSelector
(
    selectStudyResourcesState,
    selectAllStudyResources
);

export const SelectMyStudyResourcesFeature = createSelector
(
    selectMyStudyResourcesState,
    selectAllMyStudyResources
);
