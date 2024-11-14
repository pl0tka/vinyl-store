import {
    Controller,
    Get,
    Body,
    UseGuards,
    Request,
    Post,
    HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { GoogleLoginDto } from './dto/google-login.dto.js';
import { ExtractJwt } from 'passport-jwt';
import {
    SwaggerAuthLogin,
    SwaggerAuthSingup,
    SwaggerGoogleLogin,
    SwaggerGoogleLoginCallback,
    SwaggerLogout,
} from '../../common/swagger/auth/auth.swagger.js';
import { API_TAGS } from '../../common/swagger/constants/api-tags.js';
import { STATUS_CODES } from '../../common/swagger/constants/status-codes.js';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @SwaggerAuthSingup()
    @Public()
    @Post('signup')
    async signup(@Body() body: SignupDto): Promise<void> {
        await this._authService.signup(body);
    }

    @SwaggerAuthLogin()
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<LoginResponseDto> {
        return this._authService.login(req.user);
    }

    @SwaggerGoogleLogin()
    @Public()
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleLogin() {}

    @SwaggerGoogleLoginCallback()
    @Public()
    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Request() req): Promise<LoginResponseDto> {
        return await this._authService.authGoogle(req.user as GoogleLoginDto);
    }

    @SwaggerLogout()
    @HttpCode(STATUS_CODES.NO_CONTENT)
    @Post('logout')
    async logout(@Request() req): Promise<void> {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return this._authService.logout(token);
    }
}
