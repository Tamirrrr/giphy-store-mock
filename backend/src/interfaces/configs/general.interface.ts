export interface GeneralConfig {
    restPort: number;
    debugMode: boolean;
    jwtSecret: string;
    jwtExpire: number;
    jwtRefreshSecret: string;
    jwtRefreshExpire: number;
}