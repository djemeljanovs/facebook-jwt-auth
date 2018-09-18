import * as user from './user';
import * as auth from './auth';
import { combineReducers } from 'redux';

export interface State {
    auth: auth.State,
    user: user.State,
}

export const initialState = {
    auth: auth.initialState,
    user: user.initialState,
};

export const reducer = combineReducers<State>({
    auth: auth.reducer,
    user: user.reducer,
});