import {Request} from 'express';

export function getIp(request: Request): string {
    return request.headers['x-forwarded-for'] as string ||
        request.headers['x-real-ip'] as string ||
        request.ip;
}