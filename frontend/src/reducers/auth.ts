import { Action } from "redux";
import { ActionTypes } from "../actions/api";

export interface State {
    isAuthorized: boolean,
}

export const initialState: State = {
    isAuthorized: false,
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.FB_TOKEN_AUTH_SUCCESS:
        case ActionTypes.AUTO_SIGN_IN_SUCCESS:
            return { isAuthorized: true };
        case ActionTypes.SIGN_OUT_SUCCESS:
            return { isAuthorized: false };
        default:
            return state;
    }
}