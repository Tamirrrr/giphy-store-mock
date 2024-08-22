import {NextFunction, Request, Response} from "express";
import {
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    RefreshResponse,
    RegisterRequest,
    RegisterResponse
} from "../interfaces/auth/auth.interface";
import AuthService from "../services/auth/auth.service";
import {HttpStatus} from "../enums/http-status.enum";
import RateLimitService from "../services/ratelimit/ratelimit.service";
import {getIp} from "../utils/request.utils";
import ratelimitConfig from "../configs/ratelimit.config";
import {AuthenticatedRequest} from "../interfaces/authenticated-request";
import {User} from "../entities/user.entity";
import UserService from "../services/user/user.service";

export default new class AuthController {
    async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const request: LoginRequest = req.body as LoginRequest;

            const authResponse = await AuthService.login(request.email, request.password);

            const rateLimitKey: string = RateLimitService.getCachedKey(getIp(req),
                ratelimitConfig.auth.login.method);
            await RateLimitService.resetRequestCount(rateLimitKey);

            return res.json({
                success: true,
                ...authResponse
            } as LoginResponse);
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const request: RegisterRequest = req.body as RegisterRequest;

            const authResponse = await AuthService.register(request.email, request.password);

            return res.status(HttpStatus.CREATED).json({
                success: true,
                ...authResponse
            } as RegisterResponse);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const request: RefreshRequest = req.body as RefreshRequest;

            const authResponse = await AuthService.refreshAccessToken(request.refreshToken);

            return res.json({
                success: true,
                ...authResponse
            } as RefreshResponse);
        } catch (error) {
            next(error);
        }
    }

    async information(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user: User = await UserService.findById(req.user.id);
            user.password = undefined;

            return res.json({
                success: true,
                user,
            });
        } catch (error) {
            next(error);
        }
    }
}