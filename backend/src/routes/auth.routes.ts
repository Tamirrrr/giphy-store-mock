import {Router} from "express";
import AuthController from "../controllers/auth.controller";
import jwtMiddleware from "../middlewares/jwt.middleware";
import {rateLimitMiddleware} from "../middlewares/ratelimit.middleware";
import ratelimitConfig from "../configs/ratelimit.config"

const authRouter: Router = Router();

authRouter.post('/login', rateLimitMiddleware(ratelimitConfig.auth.login), AuthController.login);

authRouter.post('/register', AuthController.register);

authRouter.post('/refresh', jwtMiddleware, AuthController.refresh);

authRouter.get('/information', jwtMiddleware, AuthController.information);

export default authRouter;