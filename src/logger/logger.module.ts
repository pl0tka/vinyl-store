import { Module, Scope } from '@nestjs/common';
import { LoggerService } from './logger.service.js';

@Module({
    providers: [
        {
            provide: LoggerService,
            useFactory: (logFilePath: string) => {
                return new LoggerService(logFilePath);
            },
            scope: Scope.TRANSIENT,
        },
    ],
    exports: [LoggerService],
})
export class LoggerModule {}
