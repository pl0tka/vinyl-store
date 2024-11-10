import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestMiddleware } from './logger/logger.middleware.js';
import typeorm from './config/orm.config.js';
import serverConfig from './config/server.config.js';
import { UserModule } from './modules/user/user.module.js';
import { RoleModule } from './modules/role/role.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { VinylModule } from './modules/vinyl/vinyl.module.js';
import { OrderModule } from './modules/order/order.module.js';
import { StripeModule } from './modules/stripe/stripe.module.js';
import { LoggerService } from './logger/logger.service.js';
import { LoggerModule } from './logger/logger.module.js';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
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
        OrderModule,
        StripeModule,
        LoggerModule,
    ],
    providers: [
        {
            provide: LoggerService,
            useFactory: () => {
                return new LoggerService();
            },
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogRequestMiddleware).forRoutes('*');
    }
}
