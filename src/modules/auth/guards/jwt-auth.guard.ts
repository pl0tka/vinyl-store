import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator.js';
import { ExtractJwt } from 'passport-jwt';
import { TokenBlacklistService } from '../../../modules/token-blacklist/token-blacklist.service.js';
import { ExecutionContext } from '@nestjs/common';
import { ERROR_MESSAGES } from '../../../common/constants/constants.js';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private _reflector: Reflector,
        private _tokenBlacklistService: TokenBlacklistService
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this._reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (isPublic) {
            return true;
        }

        // checking if the token is blacklisted
        const request = context.switchToHttp().getRequest();
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

        if (!token) {
            throw new UnauthorizedException(ERROR_MESSAGES.NO_TOKEN_PROVIDED);
        }

        const isBlacklisted =
            await this._tokenBlacklistService.checkIfInBlacklist(token);
        if (isBlacklisted) {
            throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN);
        }

        const canActivateResult = await super.canActivate(context);
        if (canActivateResult instanceof Observable) {
            console.log('can activate result is observable');
            return await firstValueFrom(canActivateResult);
        }

        return canActivateResult;
    }
}
