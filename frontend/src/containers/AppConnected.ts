import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { ReactFacebookLoginInfo } from "react-facebook-login";

import { State } from '../reducers';
import { App } from "../components/App";
import { isAuthorized } from "../selectors/auth";
import { createFBTokenAuthRequest } from "../actions/api";

const mapStateToProps = (state: State) => ({
    isAuthorized: isAuthorized(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    handleFacebookLoginSuccess: (facebookUser: ReactFacebookLoginInfo) => {
        dispatch(createFBTokenAuthRequest(facebookUser));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)