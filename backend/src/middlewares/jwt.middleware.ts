import HttpException from "../exceptions/http.exception";
import {NextFunction, Request, Response} from "express";
import AuthService from '../services/auth/auth.service';
import {User} from "../entities/user.entity";

export default async function jwtMiddleware(req: Request & { user: User }, res: Response, next: NextFunction) {
    const authHeader: string = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Authorization header missing or malformed'));
    }

    const token: string = authHeader.split(' ')[1];

    try {
        if (!token) {
            throw new HttpException(401, 'Invalid token');
        }

        req.user = await AuthService.jwtVerify(token);
        next();
    } catch (err) {
        next(err);
    }
}