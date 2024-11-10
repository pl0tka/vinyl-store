import { Injectable } from '@nestjs/common';
import { TokenBlacklistRepository } from './token-blacklist.repository.js';

@Injectable()
export class TokenBlacklistService {
    constructor(private readonly _repository: TokenBlacklistRepository) {}

    async checkIfInBlacklist(token: string): Promise<boolean> {
        const tokenInBlackList = await this._repository.findToken(token);

        return tokenInBlackList ? true : false;
    }

    async blacklistToken(token: string): Promise<void> {
        return await this._repository.create(token);
    }
}
