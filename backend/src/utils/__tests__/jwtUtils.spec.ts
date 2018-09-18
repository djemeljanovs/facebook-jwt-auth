import {
    createJWTToken,
    getTokenFromReq,
    verifyJWTToken,
} from "../jwtUtils";
const MockExpressRequest = require('mock-express-request');

describe('jwtUtils', () => {

    describe('createJWTToken', () => {
        it('should create non-empty jwt token', () => {
            const token = createJWTToken({});
            expect(token).not.toBeNull();
            expect(token).not.toEqual('');
        });
    });

    describe('verifyJWTToken', () => {
        it('should contain payload in a parsed token', async () => {
            const token = createJWTToken({payload: {foo: 'bar'}});
            const parsed = await verifyJWTToken(token);
            expect(parsed).toHaveProperty('payload', {foo: 'bar'});
        });

        it('should throw an error for invalid token', async () => {
            const token = createJWTToken({payload: {foo: 'bar'}});
            // https://github.com/facebook/jest/issues/5538
            let error = null;
            try {
                await verifyJWTToken(token + 'makeinvalid')
            } catch (e) {
                error = e;
            }
            expect(error).not.toBeNull();
        });

        it('should throw an error for empty token', async () => {
            // https://github.com/facebook/jest/issues/5538
            let error = null;
            try {
                await verifyJWTToken('')
            } catch (e) {
                error = e;
            }
            expect(error).not.toBeNull();
        });
    });

    describe('getTokenFromReq', () => {
        it('should extract token from the correct authorization header', () => {
            const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWUwMDVlNDg5MmUwNThjMzJjNWVjZCIsImlhdCI6MTUzNzEyNDQ0OSwiZXhwIjoxNTM3MTMxNjQ5fQ.qLIUcjwgqR650ieSxoDQj_pfl3AuO48E2khMK0Y9GuU';
            const request = new MockExpressRequest({
                headers: {
                    'authorization': `Bearer ${mockToken}`
                },
            });
            const parsedToken = getTokenFromReq(request);
            expect(parsedToken).toEqual(mockToken);
        });

        it('should extract no token from the empty authorization header', () => {
            const request = new MockExpressRequest({
                headers: {
                    'authorization': ''
                },
            });
            const parsedToken = getTokenFromReq(request);
            expect(parsedToken).toBeNull();
        });

        it('should extract no token when no authorization header set', () => {
            const parseToken = getTokenFromReq(new MockExpressRequest({}));
            expect(parseToken).toBeNull();
        });

        it('should extract no token from malformed authorization header', () => {
            const request = new MockExpressRequest({
                headers: {
                    'authorization': 'malformed',
                },
            });
            const parsedToken = getTokenFromReq(request);
            expect(parsedToken).toBeNull();
        });
    })


});