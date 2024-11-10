import {
    Controller,
    Get,
    Body,
    UseGuards,
    Request,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { GoogleLoginDto } from './dto/google-login.dto.js';
import { ExtractJwt } from 'passport-jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Public()
    @Post('signup')
    async signup(@Body() body: SignupDto) {
        await this._authService.signup(body);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this._authService.login(req.user);
    }

    @Public()
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleLogin() {}

    @Public()
    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Request() req) {
        return await this._authService.logInGoogle(req.user as GoogleLoginDto);
    }

    @Post('logout')
    async logout(@Request() req) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return this._authService.logout(token);
    }
}
