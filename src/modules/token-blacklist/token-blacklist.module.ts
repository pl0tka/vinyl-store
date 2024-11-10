import { Module } from '@nestjs/common';
import { TokenBlacklistService } from './token-blacklist.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklist } from '../../database/entities/TokenBlacklist.js';
import { TokenBlacklistRepository } from './token-blacklist.repository.js';

@Module({
    imports: [TypeOrmModule.forFeature([TokenBlacklist])],
    providers: [TokenBlacklistService, TokenBlacklistRepository],
    exports: [TokenBlacklistService],
})
export class TokenBlacklistModule {}
