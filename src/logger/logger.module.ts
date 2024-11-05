import { Module } from '@nestjs/common';
import { WinstonLogger } from './logger.js';

@Module({
    providers: [
        {
            provide: WinstonLogger,
            useFactory: (logFilePath: string) => {
                return new WinstonLogger(logFilePath);
            },
        },
    ],
    exports: [WinstonLogger],
})
export class LoggerModule {
    static forRoot(logFilePath: string) {
        return {
            module: LoggerModule,
            providers: [
                {
                    provide: WinstonLogger,
                    useFactory: () => new WinstonLogger(logFilePath),
                },
            ],
            exports: [WinstonLogger],
        };
    }
}
