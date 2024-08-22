import {NextFunction, Request, Response} from 'express';
import logger from "../utils/logger.utils";
import RateLimitService from "../services/ratelimit/ratelimit.service";
import HttpException from "../exceptions/http.exception";
import {HttpStatus} from "../enums/http-status.enum";
import {getIp} from "../utils/request.utils";

export interface RateLimitOptions {
    method?: string;
    limit: number;
    ttl: number;
}

export function rateLimitMiddleware(options: RateLimitOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const key: string = RateLimitService.getCachedKey(getIp(req), options.method);
        try {
            if (!await RateLimitService.isExpiryExists(key)) {
                await RateLimitService.resetRequestCount(key);
            }

            const currentCount: number = await RateLimitService.getRequestCount(key);
            if (!currentCount) {
                await RateLimitService.setExpiry(key, options.ttl);
            }

            if (currentCount >= options.limit) {
                throw new HttpException(HttpStatus.TOO_MANY_REQUESTS, 'Rate limit exceeded');
            }

            await RateLimitService.incrementRequestCount(key);
            next();
        } catch (error) {
            if (error instanceof HttpException) {
                next(error);
            } else {
                logger.error(`[RateLimitMiddleware] Failed to process rate limit for key ${key}:`, error);
                next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
            }
        }
    };
}
