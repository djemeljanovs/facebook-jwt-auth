import express, {NextFunction, Request, Response} from 'express';
import passport from 'passport';

import * as passportConfig from "./config/passport";

import { AuthController } from './controllers';
import * as bodyParser from 'body-parser';
import mongoose from "mongoose";

export const createApp = () => {
    passportConfig.init();

    const app: express.Application = express();

    mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017')
        .then(() => console.log("DATABASE CONNECTED"))
        .catch((err: Error) => {
            console.error("Please check you MongoDB configuration!", err);
        });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
        console.log(err);
        next();
    });

    app.use('/api/auth', AuthController);
    return app;
};

export default createApp;