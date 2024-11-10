import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenBlacklist } from '../../database/entities/index.js';
import { Repository } from 'typeorm';

@Injectable()
export class TokenBlacklistRepository {
    constructor(
        @InjectRepository(TokenBlacklist)
        private readonly _repository: Repository<TokenBlacklist>
    ) {}

    async findToken(token: string): Promise<TokenBlacklist | null> {
        const blacklistedToken = await this._repository.findOneBy({
            token,
        });

        return blacklistedToken;
    }

    async create(token: string): Promise<void> {
        const newBlacklistedToken = this._repository.create({
            token,
        });

        await this._repository.save(newBlacklistedToken);
    }
}
