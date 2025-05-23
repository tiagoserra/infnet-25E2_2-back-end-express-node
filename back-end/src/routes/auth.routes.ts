import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRouter: Router = express.Router();
const authController = new AuthController();

authRouter.post('/login', (req, res) => authController.login(req, res));

export default authRouter;
