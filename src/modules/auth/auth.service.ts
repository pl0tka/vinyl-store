import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WinstonLogger } from '../../logger/logger.js';
import { SignupDto } from './dto/signup-dto.js';
import { UserService } from '../user/user.service.js';
import { User as UserEntity } from '../../database/entities/index.js';
import { PasswordUtil } from '../../utils/password.util.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { RoleService } from '../role/role.service.js';
import { Role as RoleEntity } from '../../database/entities/Role.js';
import { Role } from '../../guards/roles.enum.js';
import { GoogleLoginDto } from './dto/google-login-dto.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private readonly _logger: WinstonLogger,
        private readonly _userService: UserService,
        private readonly _roleService: RoleService,
        private readonly _jwtService: JwtService
    ) {
        this._logger.setContext('Auth');
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
            vinyls: [],
            reviews: [],
        };

        await this._userService.create(newUser);
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        console.log(payload);

        return {
            access_token: await this._jwtService.signAsync(payload),
        };
    }

    async validateUserLocal(
        email: string,
        password: string
    ): Promise<UserEntity> {
        const user = await this._userService.findByEmail(email);

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
        let user = await this._userService.findById(id);
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
            vinyls: [],
            reviews: [],
        };
        await this._userService.create(newUser);

        return await this.login(newUser);
    }
}
