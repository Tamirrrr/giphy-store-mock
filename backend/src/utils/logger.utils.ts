import winston from "winston";
import loggerConfig from "../configs/logger.config";

const logger: winston.Logger = winston.createLogger({
    level: loggerConfig.winston.level || loggerConfig.level,
    format: loggerConfig.winston.format,
    transports: [
        new winston.transports.Console()
    ]
});

export default logger;