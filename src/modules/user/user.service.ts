import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { UserRepository } from './user.repository.js';
import { User } from '../../database/entities/index.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';

@Injectable()
export class UserService {
    constructor(private readonly _userRepository: UserRepository) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this._userRepository.findByEmail(email);
    }

    async create(user: User): Promise<void> {
        try {
            await this._userRepository.create(user);
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(ERROR_MESSAGES.USER_EMAIL_EXISTS);
            }

            throw new BadRequestException(ERROR_MESSAGES.USER_CREATION_FAILED);
        }
    }
}
