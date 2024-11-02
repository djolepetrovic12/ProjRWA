import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import * as UserActions from "../actions/user.action"


export interface UserState
{
    Iam:User | null;
    isAuthenticated:boolean;
    error:string | null;
}

export const UserInitialState : UserState =
{
    Iam: null,
    isAuthenticated : false,
    error:null
};

export const UserReducer = createReducer(
    UserInitialState,
    on(UserActions.LoginSuccess, (state, { user }) => ({
        ...state,
        Iam:user,
        isAuthenticated: true,
        error: null,
      })),
    on(UserActions.LogoutSuccess, (state) => ({
        ...state,
        Iam: null,
        isAuthenticated: false,
        error: null,
    })),
    on(UserActions.LogoutFailed, (state,{error}) => ({
        ...state,
        error
    })),      
      
)
