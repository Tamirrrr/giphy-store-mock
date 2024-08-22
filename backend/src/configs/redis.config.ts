import {RedisConfig} from "../interfaces/configs/redis.interface";

const DEFAULT_HOST: string = "localhost";
const DEFAULT_PORT: number = 6379;

const config: RedisConfig = {
    host: process.env.REDIS_HOST || DEFAULT_HOST,
    port: +process.env.REDIS_PORT || DEFAULT_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
}

export default config;