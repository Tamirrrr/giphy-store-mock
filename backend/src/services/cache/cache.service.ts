import {CacheDrivers} from "../../enums/cache/cache-drivers.enum";
import RedisCacheDriver from "./drivers/redis.driver";
import CacheDriver from "./drivers/cache-driver.abstract";
import cacheConfig from "../../configs/cache.config";
import MemoryCacheDriver from "./drivers/memory.driver";

type CacheDriversMap = {
    [driver: string]: CacheDriver;
};

export default new class CacheService {
    private readonly drivers: CacheDriversMap = {};

    constructor() {
        this.drivers = {
            [CacheDrivers.REDIS]: new RedisCacheDriver(),
            [CacheDrivers.MEMORY]: new MemoryCacheDriver(),
        }
    }

    public getDriver(driver?: CacheDrivers): CacheDriver {
        if (!driver) {
            driver = cacheConfig.defaultDriver;
        }
        const cacheDriver: CacheDriver = this.drivers[driver];

        if (!cacheDriver) {
            throw new Error(`Cache driver ${driver} not found`);
        }

        return cacheDriver;
    }
}