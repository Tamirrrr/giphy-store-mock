import {
    CacheDriverDeleteOptions,
    CacheDriverGetOptions,
    CacheDriverSetOptions
} from "../../../interfaces/cache/driver-options.interface";

export default abstract class CacheDriver {
    abstract get(options: CacheDriverGetOptions): Promise<string | null>;
    abstract set(options: CacheDriverSetOptions): Promise<void>;
    abstract delete(options: CacheDriverDeleteOptions): Promise<void>;
}