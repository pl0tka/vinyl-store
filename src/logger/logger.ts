import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf } = format;

@Injectable()
export class WinstonLogger implements LoggerService {
    private logger;

    constructor(logFilePath: string) {
        this.logger = createLogger({
            level: 'info',
            format: combine(
                timestamp(),
                printf(
                    ({ timestamp, level, message }) =>
                        `${timestamp} ${level} ${this.getContext()}: "${message}"`
                )
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: logFilePath }),
            ],
        });
    }

    private context: string;

    setContext(context: string) {
        this.context = context;
    }

    private getContext(): string {
        return this.context ? `[${this.context}]` : '';
    }

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }
}
