import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module.js';
import { VinylModule } from './modules/vinyl/vinyl.module.js';
import { WinstonLogger } from './logger/logger.js';
import { LogRequestMiddleware } from './logger/logger.middleware.js';
import typeorm from './config/orm.config.js';
import serverConfig from './config/server.config.js';

import { UserModule } from './modules/user/user.module.js';
import { RoleModule } from './modules/role/role.module.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm, serverConfig],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
        AuthModule,
        VinylModule,
        UserModule,
        RoleModule,
    ],
    providers: [
        {
            provide: WinstonLogger,
            useFactory: () => {
                return new WinstonLogger('logs/requests.log');
            },
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogRequestMiddleware).forRoutes('*');
    }
}
