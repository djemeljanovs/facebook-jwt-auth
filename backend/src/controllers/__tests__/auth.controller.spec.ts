import request from 'supertest';
import createApp from '../../app';
import passport from 'passport';
import sinon, { SinonStub } from 'sinon';

import { IUser, User } from "../../models/User";
import { createJWTToken } from "../../utils/jwtUtils";

import { Application, NextFunction } from "express";

describe('roots', () => {

    const TEST_FACEBOOK_ID = '111';
    const TEST_DISPLAY_NAME = 'John Smith';
    const TEST_PROFILE_IMAGE = 'test.png';

    let app: Application
    let authenticate: SinonStub;
    let user: IUser;
    let testToken: string;

    beforeEach(async () => {
        // Stub passport authentication
        authenticate = sinon.stub(passport, 'authenticate');
        authenticate.returns((_req: Request, _res: Response, next: NextFunction) => { next(); });

        app = createApp();
        // Create test user
        user = await User.create({
            FacebookId: TEST_FACEBOOK_ID,
            DisplayName: TEST_DISPLAY_NAME,
            ProfileImage: TEST_PROFILE_IMAGE,
        });
        testToken = createJWTToken({id: user.id});
    });

    afterEach(async () => {
        // Cleanup
        authenticate.restore();
        await user.remove();
    });

    describe.skip('/api/auth/facebook', () => {

        it('Should assign app JWT token for authenticated Facebook user', async () => {
            //authenticate.yields(null, { id: 1, displayName: TEST_DISPLAY_NAME });
            const res = await request(app)
                .post('/api/auth/facebook')
                .set('Authorization', `Bearer ${testToken}`);

            expect(res.status).toEqual(200);
        });

        it('Should reject app authentication for unauthenticated Facebook user', async () => {
            //authenticate.yields({error: 'Error'});
            const res = await request(app)
                .post('/api/auth/facebook')
                .set('Authorization', `Bearer ${testToken}`);

            expect(res.status).toEqual(401);
        });
    });

    describe('/api/auth/autosignin', () => {

        it('Should auto sign in user using valid JWT token and return user data in response body', async () => {
            const res = await request(app)
                .post('/api/auth/autosignin')
                .set('Authorization', `Bearer ${testToken}`);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('FacebookId', TEST_FACEBOOK_ID);
            expect(res.body).toHaveProperty('DisplayName', TEST_DISPLAY_NAME);
            expect(res.body).toHaveProperty('ProfileImage', TEST_PROFILE_IMAGE);
        });

        it('Should reject auto sign in for request without authorization header', async () => {
            const res = await  request(app)
                .post('/api/auth/autosignin');

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('error', 'Authentication failed');
        });

        it('Should reject auto sign in for request with invalid JWT value in authorization header', async () => {
            const res = await  request(app)
                .post('/api/auth/autosignin')
                .set('Authorization', 'invalid value');

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('error', 'Authentication failed');
        });

    });
});