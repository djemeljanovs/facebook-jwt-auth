import { AnyAction } from "redux";
import { ActionTypes } from "../actions/api";

export interface State {
    displayName: string
    profileImage: string
    email?: string
    familyName: string
    givenName: string
}

export const initialState: State = {
    displayName: '',
    familyName: '',
    givenName: '',
    profileImage: '/silhouette.png',
};

export function reducer(state: State = initialState, action: AnyAction) {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                displayName: action.payload.DisplayName,
                profileImage: action.payload.ProfileImage,
                email: action.payload.Email,
                familyName: action.payload.FamilyName,
                givenName: action.payload.GivenName,
            };
        default:
            return state;
    }
}