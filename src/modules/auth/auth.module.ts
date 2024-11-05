import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoggerModule } from '../../logger/logger.module.js';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy.js';
import { AuthController } from './auth.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from '../../database/entities/index.js';
import { LocalStrategy } from './strategies/local.strategy.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { RoleModule } from '../role/role.module.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
    imports: [
        UserModule,
        RoleModule,
        LoggerModule.forRoot('logs/auth.log'),
        ConfigModule,
        PassportModule,
        TypeOrmModule.forFeature([User, Role]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES'),
                },
            }),
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        GoogleStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
