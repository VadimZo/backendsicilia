import {UserModel} from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { generateMD5 } from '../utils/generateHash.js';
class UserController {
    async register(req,res){
        try {
          const errors = validationResult(req);
        
          if (!errors.isEmpty()) {
            res.status(400).json({ status: 'error', errors: errors.array() });
            return;
          }    
          const randomStr = Math.random()*10000;
   
          const data = {
              phone: req.body.phone,
              password: generateMD5(req.body.password + (process.env.SECRET_KEY || 1234)),
          }
    
          const user = await UserModel.create(data);

  
          res.status(201).json({
            status: 'success',
            data: user,
          });

        } catch (error) {
          res.status(500).json({
            status: 'error',
            message: error,
          });
        }
      }
    async login(req,res){
        try {
            const user = req.user;
            res.json({
                status: 'success',
                data: {
                    ...user,
                    token: jwt.sign({ data: req.user }, process.env.SECRET_KEY || '123', {
                        expiresIn: '30 days',
                    }),
                },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
    async getUserInfo(req,res){
        try {
            const user = req.user;
            res.json({
                status: 'success',
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
}

export const UserCtrl = new UserController();