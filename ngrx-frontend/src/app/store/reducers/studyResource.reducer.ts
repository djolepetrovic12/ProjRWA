import { createReducer, on } from "@ngrx/store";
import { StudyResource } from "../../models/studyResource";
import * as StudyResourceActions from "../actions/studyResource.actions"
import * as CommentActions from "../actions/comment.actions"


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
        list: state.list ? [...state.list, studyResource] : [studyResource],
        myList: state.myList ? [...state.myList, studyResource] : [studyResource]
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
    on(StudyResourceActions.UpdateMyStudyResourceSuccess,(state,{studyResource}) => ({
        ...state, 
        myList: state.myList ? state.myList.map(sr => sr.id === studyResource.id ? studyResource : sr) : null,
        list: state.list ? state.list.map(sr => sr.id === studyResource.id ? studyResource : sr) : null
    })),
    on(StudyResourceActions.UpdateMyStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.DeleteMyStudyResourceSuccess,(state,{id}) => ({
        ...state, 
        list: state.list ? state.list.filter(fc => fc.id !== id) : null,
        myList: state.myList ? state.myList.filter(fc => fc.id !== id) : null
    })),
    on(StudyResourceActions.DeleteMyStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(CommentActions.CreateACommentSuccess,(state,{comment}) => ({
        ...state,
        list: state.list ? state.list.map(resource => resource.id === comment.studyResourceID ? {...resource, comments: [...resource.comments, comment]} : resource) : null,
        myList: state.myList ? state.myList.map(resource => resource.id === comment.studyResourceID ? {...resource, comments: [...resource.comments, comment]} : resource) : null
    })),
    on(CommentActions.CreateACommentFailure, (state, {error}) => ({
        ...state,
        error
    }))

    
)
