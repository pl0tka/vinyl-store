import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../logger/logger.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { UserService } from '../user/user.service.js';
import { User as UserEntity } from '../../database/entities/index.js';
import { PasswordUtil } from '../../utils/password.util.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { RoleService } from '../role/role.service.js';
import { Role as RoleEntity } from '../../database/entities/Role.js';
import { Role } from '../../guards/roles.enum.js';
import { GoogleLoginDto } from './dto/google-login.dto.js';
import { v4 as uuidv4 } from 'uuid';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly _logger: LoggerService,
        private readonly _userService: UserService,
        private readonly _roleService: RoleService,
        private readonly _jwtService: JwtService,
        private readonly _tokenBlacklistService: TokenBlacklistService
    ) {
        this._logger.setContext(AuthService.name);
    }

    async signup(signupDto: SignupDto) {
        const userRole: RoleEntity = await this._roleService.findByName(
            Role.User
        );

        const newUser: UserEntity = {
            ...signupDto,
            id: uuidv4(),
            password: await PasswordUtil.hashPassword(signupDto.password),
            roles: [userRole],
            reviews: [],
            orders: [],
            changeLogs: [],
        };

        await this._userService.create(newUser);
    }

    async login(user: any) {
        const roles = user.roles?.map((role: RoleEntity) => role.name);
        const payload = {
            email: user.email,
            sub: user.id,
            roles,
        };

        return {
            access_token: await this._jwtService.signAsync(payload),
        };
    }

    async validateUserLocal(
        email: string,
        password: string
    ): Promise<UserEntity> {
        const user = await this._userService.findByEmailWithRoles(email);

        if (!user) {
            throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        if (user && !user.password) {
            throw new ConflictException(ERROR_MESSAGES.USER_WRONG_LOGIN_METHOD);
        }

        const isPasswordCorrect: boolean = await PasswordUtil.validatePassword(
            password,
            user?.password
        );

        if (!isPasswordCorrect) {
            throw new UnauthorizedException(ERROR_MESSAGES.UNAUTHORIZED);
        }

        return user;
    }

    async logInGoogle(googleLoginDto: GoogleLoginDto) {
        if (!googleLoginDto) {
            throw new BadRequestException();
        }

        const { id, email, firstName, lastName, avatar } = googleLoginDto;
        let user = await this._userService.findByIdWithRoles(id);

        if (user) {
            return await this.login(user);
        }

        user = await this._userService.findByEmail(email);
        if (user) {
            throw new ConflictException(ERROR_MESSAGES.USER_WRONG_LOGIN_METHOD);
        }

        const userRole: RoleEntity = await this._roleService.findByName(
            Role.User
        );
        const newUser = {
            id,
            email,
            firstName,
            lastName,
            avatar,
            password: null,
            birthday: null,
            roles: [userRole],
            reviews: [],
            orders: [],
            changeLogs: [],
        };
        await this._userService.create(newUser);

        return await this.login(newUser);
    }

    async logout(token: string) {
        try {
            await this._tokenBlacklistService.blacklistToken(token);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
