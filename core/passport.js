import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/UserModel.js';
import { generateMD5 } from '../utils/generateHash.js';

passport.use(
    new LocalStrategy(
        async (phone, password, done) => {
    try {
        const user = await UserModel.findOne({ phone: phone }).exec();

        if (!user) {
            return done(null, false);
        }

        if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
},
),
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY || '123',
            jwtFromRequest: ExtractJwt.fromHeader('token'),
        },
        async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.data._id).exec();

        if (user) {
            return done(null, user);
        }

        done(null, false);
    } catch (error) {
        done(error, false);
    }
},
),
);

passport.serializeUser((user, done) => {
    done(null, user?._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

export { passport };
