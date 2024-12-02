import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const RehydrateAuth = createAction('Rehydrate me');

export const Login = createAction('Login a user', props<{formData:any}>());
export const LoginSuccess = createAction('Login Success', props<{ user: User }>());
export const LoginFailure = createAction('Login Failure', props<{ error: string }>());

export const Register = createAction('Register a user', props<{ formData:any }>());
export const RegisterSuccess = createAction('Register Success', props<{ message: any }>());
export const RegisterFailure = createAction('Register Failure', props<{ error: string }>());

export const Logout = createAction('Logout');
export const LogoutSuccess = createAction('Logout Success', props<{message:any}>());
export const LogoutFailed = createAction('Logout Failure', props<{error:any}>());

export const LoadAllUsers = createAction('Load all users',props<{userID:number}>());
export const LoadAllUsersSuccess = createAction('Load all users success',props<{users:User[]}>());
export const LoadAllUsersFailure = createAction('Load all users failure',props<{error:any}>());

export const DeleteUser = createAction('Delete a user', props<{ id:number }>());
export const DeleteUserSuccess = createAction('Delete Success', props<{ id:number }>());
export const DeleteUserFailure = createAction('Delete Failure', props<{ error: string }>());

export const UpdateUser = createAction('Update a user', props<{ id:number, formData:any }>());
export const UpdateUserSuccess = createAction('Update Success', props<{ user: User }>());
export const UpdateUserFailure = createAction('Update Failure', props<{ error: string }>());

