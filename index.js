import dotenv from 'dotenv';
dotenv.config();

import "./core/db.js";

import { registerValidations } from './validations/register.js';

import express from 'express';
import bodyParser from 'body-parser';
import {MenuCtrl} from './controllers/MenuController.js';
import {UserCtrl} from './controllers/UserController.js';
import {passport} from "./core/passport.js";
import cors from 'cors';



const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());

app.get('/', MenuCtrl.index);
app.post('/sineup',registerValidations, UserCtrl.register);
app.post('/sinein',passport.authenticate('local'), UserCtrl.login);
app.get('/profile', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);


app.listen(process.env.PORT,()=>{
    console.log("Server Running");
});
