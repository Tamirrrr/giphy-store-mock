import {MySqlConfig} from "../interfaces/configs/mysql.interface";

const DEFAULT_HOST: string = "localhost";
const DEFAULT_PORT: number = 3306;
const DEFAULT_USERNAME: string = "root";
const DEFAULT_PASSWORD: string = "password123"
const DEFAULT_DATABASE: string = "giphy";

const config: MySqlConfig = {
    host: process.env.DATABASE_HOST || DEFAULT_HOST,
    port: +process.env.DATABASE_PORT || DEFAULT_PORT,
    username: process.env.DATABASE_USERNAME || DEFAULT_USERNAME,
    password: process.env.DATABASE_PASSWORD || DEFAULT_PASSWORD,
    database: process.env.DATABASE_NAME || DEFAULT_DATABASE
}

export default config;