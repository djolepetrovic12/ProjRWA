import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { UserState } from "../reducers/user.reducer";

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
export const SelectAuthFeature = createSelector
(
    selectUserState,
    (state) => state.isAuthenticated
);


/*export const SelectWhoAmI = createSelector
{
    SelectUserFeature,
    (state: UserState) => state.Iam
    
}*/

