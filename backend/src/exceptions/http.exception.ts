import {HttpStatus, isErrorCode} from "../enums/http-status.enum";
import logger from "../utils/logger.utils";

export default class HttpException extends Error {
    readonly status: HttpStatus;
    readonly message: string;
    readonly context: any;

    constructor(status: HttpStatus, message: string, context?: any) {
        super(message);
        this.status = status;
        this.message = message;
    }

    getFormattedMessage(): string {
        return `Status: ${this.status}, Message: ${this.message}, Context: ${this.getContextAsString()}`;
    }

    getContextAsString(): string {
        if (typeof this.context === 'object') {
            return JSON.stringify(this.context);
        }
        return this.context;
    }

    log(method?: string): void {
        let logMessage: string = this.getFormattedMessage();

        if (method) {
            logMessage = `[${method}] ${logMessage}`;
        }

        isErrorCode(this.status) ? logger.error(logMessage) : logger.warn(logMessage);
    }
}