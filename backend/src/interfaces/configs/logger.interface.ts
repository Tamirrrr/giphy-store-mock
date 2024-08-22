import {LogLevel} from "../../enums/log-level.enum";
import winston from "winston";

export interface LoggerConfig {
    level: LogLevel;
    winston: WinstonConfig;
}

export interface WinstonConfig {
    level?: LogLevel;
    format: winston.Logform.Format;
}