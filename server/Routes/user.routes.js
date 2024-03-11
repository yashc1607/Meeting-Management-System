import express from 'express';
import { userCreated } from '../Controller/userController.js';
const userRouter = express.Router();

//public path
userRouter.use('/',userCreated);

export default userRouter; 
