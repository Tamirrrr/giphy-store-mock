import {
    CacheDriverDeleteOptions,
    CacheDriverGetOptions,
    CacheDriverSetOptions
} from "../../../interfaces/cache/driver-options.interface";
import CacheDriver from "./cache-driver.abstract";
import RedisClient from "../../../clients/redis.client";
import logger from "../../../utils/logger.utils";
import Redis from "ioredis";

export default class RedisCacheDriver extends CacheDriver {
    async get(options: CacheDriverGetOptions): Promise<string | null> {
        try {
            const client: Redis = RedisClient.getClient();
            return await client.get(options.key);
        } catch (error) {
            logger.error(`[RedisCacheDriver] An error occurred while trying get key: ${options.key}`, error);
            return null;
        }
    }

    async set(options: CacheDriverSetOptions): Promise<void> {
        try {
            const client: Redis = RedisClient.getClient();
            if (options.ttl) {
                await client.set(options.key, options.value, 'EX', options.ttl);
            } else {
                await client.set(options.key, options.value);
            }
        } catch (error) {
            logger.error(`[RedisCacheDriver] An error occurred while trying set. Key: ${options.key}, Value: ${options.value}, TTL: ${options.ttl ?? 'Not Set'}`, error);
            return null;
        }
    }

    async delete(options: CacheDriverDeleteOptions): Promise<void> {
        try {
            const client: Redis = RedisClient.getClient();
            await client.del(options.key);
        } catch (error) {
            logger.error(`[RedisCacheDriver] An error occurred while trying delete key: ${options.key}`, error);
            return null;
        }
    }
}