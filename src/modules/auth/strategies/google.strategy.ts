import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service.js';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly _authService: AuthService,
        private readonly _configService: ConfigService
    ) {
        super({
            clientID: _configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: _configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: _configService.get<string>('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
        });
    }
    authorizationParams(): { [key: string]: string } {
        return {
            access_type: 'offline',
            prompt: 'consent',
        };
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ) {
        const { name, emails, photos } = profile;

        const userProfile = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            avatar: photos[0].value,
        };

        try {
            const user =
                await this._authService.validateUserGoogle(userProfile);

            done(null, {
                ...user,
                accessToken,
                refreshToken,
            });
        } catch (err) {
            done(err, null);
        }
    }
}
