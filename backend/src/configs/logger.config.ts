import {LoggerConfig} from "../interfaces/configs/logger.interface";
import {LogLevel} from "../enums/log-level.enum";
import winston from "winston";
import generalConfig from "./general.config";

const config: LoggerConfig = {
    level: generalConfig.debugMode ?
        LogLevel.DEBUG : LogLevel.INFO,
    winston: {
        format: winston.format.combine(winston.format.json())
    }
}

export default config;