import { createReducer, on } from "@ngrx/store";
import { StudyResource } from "../../models/studyResource";
import * as StudyResourceActions from "../actions/studyResource.actions"
import * as CommentActions from "../actions/comment.actions"
import * as UserActions from "../actions/user.action"
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


export interface StudyResourceState extends EntityState<StudyResource> {
    error: string | null;
}

export interface MyStudyResourceState extends EntityState<StudyResource> {
    error: string | null;
}

export const studyResourceAdapter: EntityAdapter<StudyResource> = createEntityAdapter<StudyResource>();
export const myStudyResourceAdapter: EntityAdapter<StudyResource> = createEntityAdapter<StudyResource>();

export const initialStudyResourceState: StudyResourceState = studyResourceAdapter.getInitialState({
    error: null,
});
  
  export const initialMyStudyResourceState: MyStudyResourceState = myStudyResourceAdapter.getInitialState({
    error: null,
});

export const StudyResourceReducer = createReducer(
    initialStudyResourceState,
    on(StudyResourceActions.LoadStudyResourcesSuccess, (state, { studyResources }) =>
      studyResourceAdapter.setAll(studyResources, { ...state, error: null })
    ),
    on(StudyResourceActions.LoadStudyResourcesFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(StudyResourceActions.CreateAStudyResourceSuccess, (state, { studyResource }) =>
      studyResourceAdapter.addOne(studyResource, { ...state })
    ),
    on(StudyResourceActions.CreateAStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.UpdateMyStudyResourceSuccess, (state, { studyResource }) =>
      studyResourceAdapter.updateOne(
        { id: studyResource.id, changes: studyResource },
        { ...state }
      )
    ),
    on(StudyResourceActions.UpdateMyStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.DeleteMyStudyResourceSuccess, (state, { id }) =>
      studyResourceAdapter.removeOne(id, { ...state })
    ),
    on(StudyResourceActions.DeleteMyStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(CommentActions.CreateACommentSuccess, (state, { comment }) => {
      const resource = state.entities[comment.studyResourceID];
      if (!resource) return state;
  
      const updatedResource = {
        ...resource,
        comments: [...resource.comments, comment],
      };
  
      return studyResourceAdapter.updateOne(
        { id: comment.studyResourceID, changes: updatedResource },
        state
      );
    }),
    on(CommentActions.CreateACommentFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(StudyResourceActions.DownloadStudyResourcesSuccess, (state, { fileBlob, fileName }) => {
        // Download file immediately when success action is dispatched
        if (fileBlob) {
          const blobURL = window.URL.createObjectURL(fileBlob);
          const link = document.createElement('a');
          link.href = blobURL;
          link.download = fileName; // You can make this dynamic
          link.click();
          window.URL.revokeObjectURL(blobURL); // Clean up
        }
    
        return { ...state, fileBlob }; // Update state if necessary
      }),
      on(UserActions.LogoutSuccess, () => initialStudyResourceState)
  );






  export const MyStudyResourceReducer = createReducer(
    initialMyStudyResourceState,
    on(StudyResourceActions.LoadMyStudyResourcesSuccess, (state, { studyResources }) =>
      myStudyResourceAdapter.setAll(studyResources, { ...state, error: null })
    ),
    on(StudyResourceActions.LoadMyStudyResourcesFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.CreateAStudyResourceSuccess, (state, { studyResource }) =>
      myStudyResourceAdapter.addOne(studyResource, { ...state })
    ),
    on(StudyResourceActions.CreateAStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.UpdateMyStudyResourceSuccess, (state, { studyResource }) =>
      myStudyResourceAdapter.updateOne(
        { id: studyResource.id, changes: studyResource },
        { ...state }
      )
    ),
    on(StudyResourceActions.UpdateMyStudyResourceFailure,(state,{error}) => ({
        ...state,
        error
    })),
    on(StudyResourceActions.DeleteMyStudyResourceSuccess, (state, { id }) =>
      myStudyResourceAdapter.removeOne(id, { ...state })
    ),
    on(CommentActions.CreateACommentSuccess, (state, { comment }) => {
      const resource = state.entities[comment.studyResourceID];
      if (!resource) return state;
  
      const updatedResource = {
        ...resource,
        comments: [...resource.comments, comment],
      };
  
      return myStudyResourceAdapter.updateOne(
        { id: comment.studyResourceID, changes: updatedResource },
        state
      );
    }),
    on(CommentActions.CreateACommentFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(StudyResourceActions.DownloadMyStudyResourcesSuccess, (state, { fileBlob, fileName }) => {
        // Download file immediately when success action is dispatched
        if (fileBlob) {
          const blobURL = window.URL.createObjectURL(fileBlob);
          const link = document.createElement('a');
          link.href = blobURL;
          link.download = fileName; // You can make this dynamic
          link.click();
          window.URL.revokeObjectURL(blobURL); // Clean up
        }
    
        return { ...state, fileBlob }; // Update state if necessary
      }),
      on(UserActions.LogoutSuccess, () => initialMyStudyResourceState)

  );

/*export const StudyResourceReducer = createReducer(
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
    })),
    on(StudyResourceActions.DownloadStudyResourcesSuccess, (state, { fileBlob, fileName }) => {
        // Download file immediately when success action is dispatched
        if (fileBlob) {
          const blobURL = window.URL.createObjectURL(fileBlob);
          const link = document.createElement('a');
          link.href = blobURL;
          link.download = fileName; // You can make this dynamic
          link.click();
          window.URL.revokeObjectURL(blobURL); // Clean up
        }
    
        return { ...state, fileBlob }; // Update state if necessary
      }),

    
)*/
