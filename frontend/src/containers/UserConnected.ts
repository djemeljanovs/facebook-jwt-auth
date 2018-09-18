import { connect } from "react-redux";

import { State } from '../reducers';
import { User } from "../components/User";
import {
    getDisplayName, getEmail, getFamilyName, getGivenName,
    getProfileImage
} from "../selectors/user";
import { Action, Dispatch } from "redux";
import { createSignOutRequest } from "../actions/api";

const mapStateToProps = (state: State) => ({
    displayName: getDisplayName(state),
    familyName: getFamilyName(state),
    givenName: getGivenName(state),
    email: getEmail(state),
    profileImage: getProfileImage(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    logoutHandler: () => dispatch(createSignOutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User)