import {GeneralConfig} from "../interfaces/configs/general.interface";

// Application Defaults
const DEFAULT_REST_PORT: number = 3000;

// Jwt Defaults
const DEFAULT_JWT_SECRET: string = 'jwt_secret';
const DEFAULT_JWT_EXPIRE: number = 60 * 10;
const DEFAULT_JWT_REFRESH_SECRET: string = 'jwt_refresh_secret';
const DEFAULT_JWT_REFRESH_EXPIRE: number = 604800;

const config: GeneralConfig = {
    restPort: +process.env.REST_PORT || DEFAULT_REST_PORT,
    debugMode: +process.env.DEBUG === 1,
    jwtSecret: process.env.JWT_SECRET || DEFAULT_JWT_SECRET,
    jwtExpire: +process.env.JWT_EXPIRE || DEFAULT_JWT_EXPIRE,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || DEFAULT_JWT_REFRESH_SECRET,
    jwtRefreshExpire: +process.env.JWT_REFRESH_EXPIRE || DEFAULT_JWT_REFRESH_EXPIRE,
}

export default config;