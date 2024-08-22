import CacheService from "../cache/cache.service";

export default new class RateLimitService {
    private readonly rateLimitPrefix: string = 'rate_limit';

    getCachedKey(ip: string, method?: string): string {
        return `${this.rateLimitPrefix}:${method ?? 'all'}:${ip}`;
    }

    getExpiryCacheKey(key: string): string {
        return `${key}:expiry`;
    }

    async getRequestCount(key: string): Promise<number> {
        const count: string = await CacheService.getDriver().get({key});
        return +count;
    }

    async incrementRequestCount(key: string): Promise<void> {
        const currentCount: number = await this.getRequestCount(key);
        await CacheService.getDriver().set({
            key,
            value: `${currentCount + 1}`
        });
    }

    async setExpiry(key: string, ttl: number): Promise<void> {
        await CacheService.getDriver().set({
            key: this.getExpiryCacheKey(key),
            value: '1',
            ttl,
        });
    }

    async resetRequestCount(key: string): Promise<void> {
        await CacheService.getDriver().delete({key});
        await CacheService.getDriver().delete({key: this.getExpiryCacheKey(key)});
    }

    async isExpiryExists(key: string): Promise<boolean> {
        return await CacheService.getDriver().get({key: this.getExpiryCacheKey(key)}) === '1';
    }
}