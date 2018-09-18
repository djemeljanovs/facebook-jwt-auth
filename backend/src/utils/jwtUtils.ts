import { Request } from "express";
import { Promise } from 'bluebird';
import * as jwt from "jsonwebtoken";

const secret = 'my-secret';
const AUTHORIZATION_HEADER_NAME = 'authorization';

export const createJWTToken = (payload: any) => {
    return jwt.sign(payload, secret,{ expiresIn: 60 * 120 });
};

export const verifyJWTToken = (token: string | null) => {
    return new Promise<any>((resolve, reject) => {
        if(!token) {
            reject('No token provided');
        } else {
            try {
                jwt.verify(token, secret, (err: Error, payload: any) => {
                    if(err || !payload) {
                        reject(err);
                    } else {
                        resolve(payload);
                    }
                })
            } catch (err) {
                reject(err);
            }
        }
    });
};

/**
 *
 * @param {Response} req
 * @returns {string}
 */
export const getTokenFromReq = (req: Request) => {
    return getTokenFromAuthHeader(req.header(AUTHORIZATION_HEADER_NAME));
};

const getTokenFromAuthHeader = (authHeaderValue?: string) => {
    if(authHeaderValue) {
        const parts = authHeaderValue.split(' ');
        if(parts && parts.length > 1) {
            return parts[1];
        }
    }
    return null;
};
