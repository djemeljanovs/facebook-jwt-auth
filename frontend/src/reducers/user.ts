import { Action } from "redux";
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

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                displayName: (<any>action).payload.DisplayName,
                profileImage: (<any>action).payload.ProfileImage,
                email: (<any>action).payload.Email,
                familyName: (<any>action).payload.FamilyName,
                givenName: (<any>action).payload.GivenName,
            };
        default:
            return state;
    }
}