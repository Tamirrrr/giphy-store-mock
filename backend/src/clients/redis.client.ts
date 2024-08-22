import Redis from "ioredis";
import redisConfig from "../configs/redis.config";
import logger from "../utils/logger.utils";

export default new class RedisClient {
    private client: Redis;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5;
    private reconnectDelay: number = 1000;

    init(): void {
        try {
            this.client = new Redis(redisConfig);
            this.client.on('connect', () => {
                this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
            });
            this.client.on('error', (error) => {
                logger.error('[Redis] Error occurred during connection, trying to reconnect...', error);
                this.handleReconnect();
            });
        } catch (error) {
            logger.error('[Redis] Unknown error occurred, trying to reconnect...', error);
            this.handleReconnect();
        }
    }

    private handleReconnect(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                this.init();
            }, this.reconnectDelay);
        } else {
            logger.error('[Redis] Max reconnect attempts reached. Please check the Redis server.');
        }
    }

    getClient(): Redis {
        if (!this.client) {
            throw new Error('Redis client is not initialized.');
        }
        return this.client;
    }
}