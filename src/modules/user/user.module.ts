import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { User } from '../../database/entities/User.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../logger/logger.module.js';

@Module({
    imports: [TypeOrmModule.forFeature([User]), LoggerModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
