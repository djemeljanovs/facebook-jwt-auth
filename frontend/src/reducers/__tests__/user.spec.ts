import * as user from '../user';
import { ActionTypes } from "../../actions/api";

describe('/reducers/user', () => {

    it('should have initial state with profileImage pointing to anonymous silhouette image', () => {
        expect(user.initialState).not.toBeNull();
        expect(user.initialState.profileImage).toBeDefined();
        expect(user.initialState.profileImage).toEqual('/silhouette.png');
    });

    it('should update state upon SET_USER', () => {
        const payload = {
            DisplayName: "John Smith",
            ProfileImage: "dummy.png",
            Email:"john.smith@gmail.com",
            FamilyName: "Smith",
            GivenName: "John",
        };
        const state: user.State = user.reducer(user.initialState, {type: ActionTypes.SET_USER, payload: payload});
        expect(state).toMatchObject({
            displayName: "John Smith",
            profileImage: "dummy.png",
            email:"john.smith@gmail.com",
            familyName: "Smith",
            givenName: "John",
        });
    });

});