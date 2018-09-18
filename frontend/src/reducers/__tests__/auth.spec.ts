import * as auth from '../auth';
import { ActionTypes } from "../../actions/api";

describe('/reducers/auth', () => {

    it('should have initial state with isAuthorized being false', () => {
        expect(auth.initialState).not.toBeNull();
        expect(auth.initialState.isAuthorized).toBeDefined();
        expect(auth.initialState.isAuthorized).toBeFalsy();
    });

    it('should set isAuthorized to true upon FB_TOKEN_AUTH_SUCCESS', () => {
       const state = auth.reducer(auth.initialState, {type: ActionTypes.FB_TOKEN_AUTH_SUCCESS});
       expect(state.isAuthorized).toBeTruthy();
    });

    it('should set isAuthorized to true upon AUTO_SIGN_IN_SUCCESS', () => {
        const state = auth.reducer(auth.initialState, {type: ActionTypes.AUTO_SIGN_IN_SUCCESS});
        expect(state.isAuthorized).toBeTruthy();
    });

    it('should set isAuthorized to false upon SIGN_OUT_SUCCESS', () => {
        const state = auth.reducer({isAuthorized: true}, {type: ActionTypes.SIGN_OUT_SUCCESS});
        expect(state.isAuthorized).toBeFalsy();
    });

});