import { createAction, props } from "@ngrx/store";
import { Comment } from "../../models/comment";



export const CreateAComment = createAction('Create a comment', props<{userID:number,resourceID:number,content:any}>());
export const CreateACommentSuccess = createAction('Create a comment Success', props<{comment: Comment}>());
export const CreateACommentFailure = createAction('Create a comment Failure', props<{error: any}>());