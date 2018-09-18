import { call, put, takeLatest } from 'redux-saga/effects'
import {
    ActionTypes,
    createAutoSignInFailure,
    createAutoSignInSuccess,
    createSignOutFailure,
    createSignOutSuccess,
    createFBTokenAuthFailure,
    createFBTokenAuthSuccess,
    setUser
} from "../actions/api";

const LS_KEY_APP_AUTH_TOKEN = 'LS_KEY_APP_AUTH_TOKEN';

const fetchFBAuthEndpoint = (facebookAccessToken: string) => {
    const options = {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${facebookAccessToken}`
        },
    };
    return fetch('api/auth/facebook', options);
};

const fetchAutoSignInEndpoint = (appToken: string) => {
    const options = {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${appToken}`
        },
    };
    return fetch('api/auth/autosignin', options);
}


function* authWithFBToken(action: any) {
    try {
        const response = yield call(fetchFBAuthEndpoint, action.payload);
        const user = yield call([response, 'json']);

        localStorage.setItem(LS_KEY_APP_AUTH_TOKEN, response.headers.get('x-auth-token'));
        yield put(setUser(user));
        yield put(createFBTokenAuthSuccess());
    } catch (e) {
        yield put(createFBTokenAuthFailure(e));
    }
}

function* autoSignIn() {
    try {
        const appAuthToken = localStorage.getItem(LS_KEY_APP_AUTH_TOKEN);
        if (appAuthToken) {
            const response = yield call(fetchAutoSignInEndpoint, appAuthToken);
            const user = yield call([response, 'json']);
            yield put(setUser(user));
            yield put(createAutoSignInSuccess());
        }
    } catch (e) {
        yield put(createAutoSignInFailure(e));
    }
}

function * signOut() {
    try {
        localStorage.removeItem(LS_KEY_APP_AUTH_TOKEN);
        yield put(createSignOutSuccess());
    } catch (e) {
        yield put(createSignOutFailure(e));
    }
}
function* authSaga() {
    yield takeLatest(ActionTypes.FB_TOKEN_AUTH_REQUEST, authWithFBToken);
    yield takeLatest(ActionTypes.AUTO_SIGN_IN_REQUEST, autoSignIn);
    yield takeLatest(ActionTypes.SIGN_OUT_REQUEST, signOut)

}

export default authSaga;