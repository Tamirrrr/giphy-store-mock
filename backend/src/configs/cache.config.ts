import {CacheDrivers} from "../enums/cache/cache-drivers.enum";
import {CacheConfig} from "../interfaces/configs/cache.interface";
import logger from "../utils/logger.utils";

const defaultDriverFromEnv: string | undefined = process.env.CACHE_DRIVER;
const defaultDriver: CacheDrivers = CacheDrivers.REDIS;

const config: CacheConfig = {
    defaultDriver: defaultDriver,
}

if (defaultDriverFromEnv) {
    if (Object.values(CacheDrivers).includes(defaultDriverFromEnv as CacheDrivers)) {
        config.defaultDriver = defaultDriverFromEnv as CacheDrivers;
    } else {
        logger.error(`Invalid cache driver: ${defaultDriverFromEnv}. Defaulting to ${defaultDriver}`);
    }
}

export default config;