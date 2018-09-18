import { State } from "../reducers";
import { createSelector } from "reselect";

const getAuthState = ((state: State) => state.auth);

export const isAuthorized = createSelector([getAuthState], s => s.isAuthorized);