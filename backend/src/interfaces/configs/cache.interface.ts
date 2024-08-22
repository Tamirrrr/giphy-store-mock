import {CacheDrivers} from "../../enums/cache/cache-drivers.enum";

export interface CacheConfig {
    defaultDriver: CacheDrivers;
}