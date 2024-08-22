import HttpException from "../exceptions/http.exception";
import {NextFunction, Request, Response} from "express";
import logger from "../utils/logger.utils";
import {BaseResponse} from "../interfaces/base-response.interface";

export function errorMiddleware(
    err: HttpException | Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    let status: number = 500;
    let message: string = 'Something went wrong';

    if (err instanceof HttpException) {
        status = err.status;
        message = err.message;
    } else {
        logger.error(`[${req.method}] Status: ${status}, Message: ${message}, Error: ${err.message}`);
    }

    res.status(status).json({
        success: false,
        message,
    } as BaseResponse);
}