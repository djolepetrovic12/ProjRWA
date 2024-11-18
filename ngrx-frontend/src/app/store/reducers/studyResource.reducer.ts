import { createReducer, on } from "@ngrx/store";
import { StudyResource } from "../../models/studyResource";
import * as StudyResourceActions from "../actions/studyResource.actions"


export interface StudyResourceState
{
    list:StudyResource[] | null;
    myList:StudyResource[] | null;
    error:string | null;
}

export const StudyResourceInitialState : StudyResourceState =
{
    list: [],
    myList: [],
    error:null
};

export const StudyResourceReducer = createReducer(
    StudyResourceInitialState,
    on(StudyResourceActions.CreateAStudyResourceSuccess,(state, {studyResource }) => ({
        ...state,
        list: state.list ? [...state.list, studyResource] : [studyResource]
    })),
    on(StudyResourceActions.CreateAStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.LoadStudyResourcesSuccess,(state,{studyResources}) => ({
        ...state,
        list: studyResources
    })),
    on(StudyResourceActions.LoadStudyResourcesFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.LoadMyStudyResourcesSuccess,(state,{studyResources}) => ({
        ...state,
        myList: studyResources
    })),
    on(StudyResourceActions.LoadMyStudyResourcesFailure,(state,{error}) => ({
        ...state,
        error
    })),

    
)
