import {
    Controller,
    Get,
    Body,
    HttpException,
    HttpStatus,
    UseGuards,
    Request,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { WinstonLogger } from '../../logger/logger.js';
import { ensureErrorInstance } from '../../utils/error.util.js';
import { SignupDto } from './dto/signup-dto.js';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService,
        private readonly _logger: WinstonLogger
    ) {}

    @Public()
    @Post('signup')
    async signup(@Body() body: SignupDto) {
        try {
            await this._authService.signup(body);
        } catch (err) {
            const error = ensureErrorInstance(err);
            this._logger.error(error.message);

            throw new HttpException(
                {
                    message: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log('login: request user', req.user);

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
        return {
            user: req.user,
            token: req.user.accessToken,
        };
    }
}
