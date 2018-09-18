import { Action, ActionCreator } from "redux";
import { ReactFacebookLoginInfo } from "react-facebook-login";

export enum ActionTypes {
    FB_TOKEN_AUTH_REQUEST = 'FB_TOKEN_AUTH_REQUEST',
    FB_TOKEN_AUTH_SUCCESS = 'FB_TOKEN_AUTH_SUCCESS',
    FB_TOKEN_AUTH_FAILURE = 'FB_TOKEN_AUTH_FAILURE',

    AUTO_SIGN_IN_REQUEST = 'AUTO_SIGN_IN_REQUEST',
    AUTO_SIGN_IN_SUCCESS = 'AUTO_SIGN_IN_SUCCESS',
    AUTO_SIGN_IN_FAILURE = 'AUTO_SIGN_IN_FAILURE',

    SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST',
    SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE',
    
    SET_USER = 'SET_USER',

}

export const createFBTokenAuthRequest: ActionCreator<Action> = (userInfo: ReactFacebookLoginInfo) => {
    return { type: ActionTypes.FB_TOKEN_AUTH_REQUEST, payload: userInfo.accessToken };
};

export const createFBTokenAuthSuccess: ActionCreator<Action> = (user: any) => {
    return { type: ActionTypes.FB_TOKEN_AUTH_SUCCESS, payload: user };
};

export const createFBTokenAuthFailure: ActionCreator<Action> = (error: any) => {
  return { type: ActionTypes.FB_TOKEN_AUTH_FAILURE, payload: error };
};

export const createAutoSignInRequest: ActionCreator<Action> = () => {
    return { type: ActionTypes.AUTO_SIGN_IN_REQUEST };
};

export const createAutoSignInSuccess: ActionCreator<Action> = (user: any) => {
    return { type: ActionTypes.AUTO_SIGN_IN_SUCCESS, payload: user };
};

export const createAutoSignInFailure: ActionCreator<Action> = (error: any) => {
    return { type: ActionTypes.AUTO_SIGN_IN_FAILURE, payload: error };
};

export const createSignOutRequest: ActionCreator<Action> = () => {
    return { type: ActionTypes.SIGN_OUT_REQUEST };
};

export const createSignOutSuccess: ActionCreator<Action> = () => {
    return { type: ActionTypes.SIGN_OUT_SUCCESS };
};

export const createSignOutFailure: ActionCreator<Action> = () => {
    return { type: ActionTypes.SIGN_OUT_FAILURE };
};

export const setUser: ActionCreator<Action> = (user: any) => {
    return { type: ActionTypes.SET_USER, payload: user };
};