import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import * as UserActions from "../actions/user.action"
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export interface UserState extends EntityState<User>
{
    Iam:User | null;
    isAuthenticated:boolean;
    error:string | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const UserInitialState : UserState = adapter.getInitialState({
    Iam: null,
    isAuthenticated : false,
    error: null,
  });

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
    on(UserActions.LoadAllUsersSuccess, (state, { users }) =>
        adapter.setAll(users, {
          ...state,
          error: null,
        })
      ),
    on(UserActions.LoadAllUsersFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(UserActions.DeleteUserSuccess, (state, { id }) =>
        adapter.removeOne(id, {
          ...state,
          error: null,
        })
    ),
    on(UserActions.DeleteUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),      
      
)
