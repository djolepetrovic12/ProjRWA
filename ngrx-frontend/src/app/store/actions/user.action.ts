import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';


export const Login = createAction('Login a user', props<{formData:any}>());
export const LoginSuccess = createAction('Login Success', props<{ user: User }>());
export const LoginFailure = createAction('Login Failure', props<{ error: string }>());
export const Register = createAction('Register a user', props<{ name: string; surname:string,username:string, email: string; password: string }>());
export const RegisterSuccess = createAction('Register Success', props<{ user: User }>());
export const RegisterFailure = createAction('Register Failure', props<{ error: string }>());
export const Logout = createAction('Logout');
export const LogoutSuccess = createAction('Logout Success', props<{message:any}>());
export const LogoutFailed = createAction('Logout Failure', props<{error:any}>());

