import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { adapter, UserState } from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<AppState, UserState>('user');

export const SelectUserFeature = createSelector
(
    selectUserState,
    (state) => state.Iam
);


export const SelectUserIDFeature = createSelector
(
    selectUserState,
    (state) => state.Iam?.id
);

export const SelectUserRoleFeature = createSelector
(
    selectUserState,
    (state) => state.Iam?.role
);

export const SelectAuthFeature = createSelector
(
    selectUserState,
    (state) => state.isAuthenticated
);

const { selectAll } = adapter.getSelectors();

export const SelectAllUsersFeature = createSelector(
  selectUserState,
  selectAll
);
