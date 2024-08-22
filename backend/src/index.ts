import "reflect-metadata";
import dotenv from 'dotenv';
import logger from "./utils/logger.utils";
import express, {Express} from 'express';
import routes from './routes';
import {errorMiddleware} from './middlewares/error.middleware';
import generalConfig from "./configs/general.config";
import RedisClient from "./clients/redis.client";
import {DatasourceDal} from "./dal/datasource.dal";
import cors from 'cors';

dotenv.config();

async function main(): Promise<void> {
    logger.info("[Main] Initializing clients...");
    RedisClient.init();

    logger.info("[Main] Initializing datasource...");
    await DatasourceDal.initialize();

    logger.info("[Main] Initializing application...");
    const app: Express = express();
    app.use(express.json());
    app.use(cors({
        origin: '*',
    }))
    app.use(routes);
    app.use(errorMiddleware);

    app.listen(generalConfig.restPort, () => {
        logger.info(`[Main] Application is running on port ${generalConfig.restPort}`);
    });
}

main().catch();