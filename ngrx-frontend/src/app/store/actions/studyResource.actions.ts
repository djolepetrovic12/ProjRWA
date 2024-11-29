import { createAction, props } from "@ngrx/store";
import { StudyResource } from "../../models/studyResource";
import { User } from "../../models/user";


export const CreateAStudyResource = createAction('Create a study resource',props<{id:number,formData:any}>());
export const CreateAStudyResourceSuccess = createAction('Create a study resource success',props<{studyResource:StudyResource}>());
export const CreateAStudyResourceFailure = createAction('Create a study resource failure',props<{error:any}>());

export const DownloadStudyResources = createAction('Download study resources',props<{resourceID:number}>());
export const DownloadStudyResourcesSuccess = createAction('Download study resources success',props<{ resourceID: number; fileBlob: Blob, fileName: string }>());
export const DownloadStudyResourcesFailure = createAction('Download study resources failure',props<{error:any}>());

export const SearchItems = createAction('Search Items', props<{ query: string, professorIDs:number[] }>());
export const SearchItemsSuccess = createAction('Search Items Success', props<{ studyResources: StudyResource[] }>());
export const SearchItemsFailure = createAction('Search Items Failure', props<{ error: any }>());

export const SearchProfessors = createAction('Search professors', props<{ query: string }>());
export const SearchProfessorsSuccess = createAction('Search professors Success', props<{ professors: User[] }>());
export const SearchProfessorsFailure = createAction('Search professorss Failure', props<{ error: any }>());

export const LoadStudyResources = createAction('Load study resources');
export const LoadStudyResourcesSuccess = createAction('Load study resources success',props<{studyResources:StudyResource[]}>());
export const LoadStudyResourcesFailure = createAction('Load study resources failure',props<{error:any}>());

export const LoadMyStudyResources = createAction('Load my study resources',props<{id:number}>());
export const LoadMyStudyResourcesSuccess = createAction('Load my study resources success',props<{studyResources:StudyResource[]}>());
export const LoadMyStudyResourcesFailure = createAction('Load my study resources failure',props<{error:any}>());

export const UpdateMyStudyResource = createAction('Update my study resource',props<{id:number,formData:any}>());
export const UpdateMyStudyResourceSuccess = createAction('Update my study resource success',props<{studyResource:StudyResource}>());
export const UpdateMyStudyResourceFailure = createAction('Update my study resource failure',props<{error:any}>());

export const DeleteMyStudyResource = createAction('Delete my study resource',props<{id:number}>());
export const DeleteMyStudyResourceSuccess = createAction('Delete my study resource success',props<{id:number}>());
export const DeleteMyStudyResourceFailure = createAction('Delete my study resource failure',props<{error:any}>());