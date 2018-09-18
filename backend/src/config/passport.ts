import passport from "passport";
import { User } from "../models/User";

import { Profile, VerifyFunction } from "passport-facebook-token";
import FacebookTokenStrategy from 'passport-facebook-token';

export const init = () => {

    const getOrCreateUser = (profile: Profile) => {
        console.log(profile);
        return User.findOne({'FacebookId': profile.id})
            .then(user => {
                if(user) {
                    return user;
                } else {
                    return User.create({
                        FacebookId: profile.id,
                        DisplayName: profile.displayName,
                        FamilyName: profile.name.familyName,
                        GivenName: profile.name.givenName,
                        Email: getProfileEmail(profile),
                        ProfileImage: getProfilePhoto(profile),
                    });
                }
            });
    };

    const getProfilePhoto = (profile: Profile) => (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : null;

    const getProfileEmail = (profile: Profile) => (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null;

    const handleLoggedInToFacebook: VerifyFunction = (_accessToken, _refreshToken, profile, done) => {
        getOrCreateUser(profile)
            .then(user => {
                return user;
            })
            .then(user => done(null, user))
            .catch(err => done(err));
    };

    passport.use(new FacebookTokenStrategy({
            clientID: process.env.FACEBOOK_ID || '252165875435582',
            clientSecret: process.env.FACEBOOK_SECRET || '73ad89360c4917a3b0cf989027572c85',
        }, handleLoggedInToFacebook)
    );


};
