import {
    CacheDriverDeleteOptions,
    CacheDriverGetOptions,
    CacheDriverSetOptions
} from "../../../interfaces/cache/driver-options.interface";
import CacheDriver from "./cache-driver.abstract";

export default class MemoryCacheDriver extends CacheDriver {
    private cache: Map<string, string> = new Map();

    async get(options: CacheDriverGetOptions): Promise<string | null> {
        return this.cache.get(options.key) ?? null;
    }

    async set(options: CacheDriverSetOptions): Promise<void> {
        this.cache.set(options.key, options.value);

        if (options.ttl) {
            setTimeout(() => {
                this.cache.delete(options.key);
            }, options.ttl * 1000);
        }
    }

    async delete(options: CacheDriverDeleteOptions): Promise<void> {
        this.cache.delete(options.key);
    }
}