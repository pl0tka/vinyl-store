import { Module, Scope } from '@nestjs/common';
import { LoggerService } from './logger.service.js';
import { LoggerRepository } from './logger.repository.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeLog } from '../database/entities/index.js';
import { LoggerController } from './logger.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([ChangeLog])],
    controllers: [LoggerController],
    providers: [
        LoggerRepository,
        {
            provide: LoggerService,
            useFactory: (loggerRepository: LoggerRepository) => {
                const logFilePath = 'logs/requests.log';
                return new LoggerService(logFilePath, loggerRepository);
            },
            inject: [LoggerRepository],
            scope: Scope.TRANSIENT,
        },
    ],
    exports: [LoggerService],
})
export class LoggerModule {}
