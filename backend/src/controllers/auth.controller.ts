import { Router, Request, Response } from 'express';
import passport from "passport";
import {
    createJWTToken,
    getTokenFromReq,
    verifyJWTToken
} from "../utils/jwtUtils";
import { User } from "../models/User";

const router: Router = Router();

const handleFBAuthentication = (req: Request, res: Response) => {
    if (req.user && req.user.id) {
        const token: string = createJWTToken({id: req.user.id});
        res.setHeader('x-auth-token', token);
        res.status(200).send(JSON.stringify(req.user))
    } else {
        res.status(401).send({error: 'Authentication failed'});
    }
};

router.route('/facebook')
    .post(passport.authenticate('facebook-token', {session: false}), handleFBAuthentication);

router.route('/autosignin')
    .post((req: Request, res: Response) => {
        verifyJWTToken(getTokenFromReq(req))
            .then((payload:any) => {
                return User.findById(payload.id).exec();
            })
            .then((user:any) => {
                res.send(user);
            })
            .catch(() => {
                res.status(401).send({error: 'Authentication failed'});
            });
    });

export const AuthController: Router = router;