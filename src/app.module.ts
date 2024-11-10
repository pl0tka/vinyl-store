import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestMiddleware } from './logger/logger.middleware.js';
import typeorm from './config/orm.config.js';
import serverConfig from './config/server.config.js';
import mailerConfig from './config/nodemailer.config.js';
import { UserModule } from './modules/user/user.module.js';
import { RoleModule } from './modules/role/role.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { VinylModule } from './modules/vinyl/vinyl.module.js';
import { OrderModule } from './modules/order/order.module.js';
import { MailerModule } from './modules/mailer/mailer.module.js';
import { StripeModule } from './modules/stripe/stripe.module.js';
import { LoggerModule } from './logger/logger.module.js';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm, serverConfig, mailerConfig],
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
        MailerModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogRequestMiddleware).forRoutes('*');
    }
}
