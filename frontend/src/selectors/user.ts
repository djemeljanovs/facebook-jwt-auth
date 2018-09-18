import { State } from "../reducers";
import { createSelector } from "reselect";

const getUserState = ((state: State) => state.user);

export const getDisplayName = createSelector([getUserState], s => s.displayName);
export const getFamilyName = createSelector([getUserState], s => s.familyName);
export const getGivenName = createSelector([getUserState], s => s.givenName);
export const getEmail = createSelector([getUserState], s => s.email);
export const getProfileImage = createSelector([getUserState], s => s.profileImage);