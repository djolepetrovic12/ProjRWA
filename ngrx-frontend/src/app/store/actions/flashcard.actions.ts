import { createAction, props } from '@ngrx/store';
import { Flashcard } from '../../models/flashcard';


export const CreateAFlashcard = createAction('Create a flashcard', props<{id:number,formData:any}>());
export const CreateAFlashcardSuccess = createAction('Create a flashcard Success', props<{message: any}>());
export const CreateAFlashcardFailure = createAction('Create a flashcard Failure', props<{error: any}>());

export const LoadFlashcards = createAction('Load Flashcards', props<{ id: number }>());
export const LoadFlashcardsSuccess = createAction('Load Flashcards Success', props<{ flashcards: Flashcard[] }>());
export const LoadFlashcardsFailure = createAction('Load Flashcards Failure', props<{ error: string }>());

export const DeleteAFlashcard = createAction('Delete a flashcard',props<{id:number}>())
export const DeleteAFlashcardSuccess = createAction('Delete a flashcard success', props<{id: number}>());
export const DeleteAFlashcardFailure = createAction('Delete a flashcard failure', props<{error: any}>());

//export const Login = createAction('Login a user', props<{formData:any}>());
//export const LoginSuccess = createAction('Login Success', props<{ user: User }>());