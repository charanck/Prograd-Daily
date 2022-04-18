import express from 'express';
import _ from 'lodash';

import {registerUser , loginUser} from '../controller/userController.js';

export const userRouter = express.Router();

userRouter.post('/register',registerUser);

userRouter.post('/login',loginUser);
