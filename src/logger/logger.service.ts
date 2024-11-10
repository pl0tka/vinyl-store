import { Injectable, LoggerService as LogService, Scope } from '@nestjs/common';
import { ActionType } from '../database/entities/ChangeLog.js';
import { ChangeLog } from '../database/entities/index.js';
import { createLogger, transports, format } from 'winston';
import { LoggerRepository } from './logger.repository.js';
const { combine, timestamp, printf } = format;

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements LogService {
    private logger;

    constructor(
        private readonly _logFile: string = 'logs/requests.log',
        private readonly _loggerRepository: LoggerRepository
    ) {
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
                new transports.File({
                    filename: `${this._logFile}`,
                }),
            ],
        });
    }

    private context: string;

    private updateLogFile() {
        if (this.context) {
            this.logger.clear();
            this.logger.add(
                new transports.File({
                    filename: `logs/${this.context}.log`,
                })
            );
        }
    }

    setContext(context: string) {
        this.context = context;
        this.updateLogFile();
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

    async findAll(): Promise<ChangeLog[]> {
        return await this._loggerRepository.findAll();
    }

    async logToDB(
        actionType: ActionType,
        entity: string,
        userId: string,
        oldData: Record<string, any>,
        newData: Record<string, any>
    ) {
        const changeLog = new ChangeLog();
        changeLog.actionType = actionType;
        changeLog.entity = entity;
        changeLog.userId = userId;
        changeLog.oldData = oldData;
        changeLog.newData = newData;

        try {
            await this._loggerRepository.create(changeLog);
        } catch (err) {
            this.error(err.message);
        }
    }
}
