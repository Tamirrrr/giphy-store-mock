interface CacheDriverBaseOptions {
    key: string;
}

export interface CacheDriverGetOptions extends CacheDriverBaseOptions {
}

export interface CacheDriverSetOptions extends CacheDriverBaseOptions {
    value: string,
    ttl?: number;
}

export interface CacheDriverDeleteOptions extends CacheDriverBaseOptions {
}