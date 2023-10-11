import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);

userRouter.get('/:id', UserController.getUser);
userRouter.put('/:id', UserController.updateUser);

export default userRouter;
