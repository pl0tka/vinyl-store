import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository.js';
import { User } from '../../database/entities/index.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserRelations } from './types/types.js';
import { LoggerService } from '../../logger/logger.service.js';
import { ActionType } from '../../database/entities/ChangeLog.js';
import { ENTITIES } from '../../database/entities/constants/entities.js';

@Injectable()
export class UserService {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _logger: LoggerService
    ) {
        this._logger.setContext(UserService.name);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this._userRepository.findByEmail(email);
    }

    async findByEmailWithRoles(email: string): Promise<User | null> {
        const relationOptions: UserRelations[] = ['roles'];

        return await this._userRepository.findByEmailWithRelations(
            email,
            relationOptions
        );
    }

    async findById(id: string): Promise<User | null> {
        return await this._userRepository.findById(id);
    }

    async findByIdWithRoles(id: string): Promise<User | null> {
        const relationOptions: UserRelations[] = ['roles'];

        return await this._userRepository.findById(id, relationOptions);
    }

    async findByIdWithReviewsAndOrders(id: string): Promise<User | null> {
        const relationOptions: UserRelations[] = ['reviews', 'orders'];

        return await this._userRepository.findById(id, relationOptions);
    }

    async create(user: User): Promise<void> {
        try {
            const createdUser = await this._userRepository.create(user);
            await this._logger.logToDB(
                ActionType.CREATE,
                ENTITIES.USER,
                createdUser.id,
                createdUser
            );
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(ERROR_MESSAGES.USER_EMAIL_EXISTS);
            }

            throw new BadRequestException(ERROR_MESSAGES.USER_CREATION_FAILED);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        try {
            const updateResult = await this._userRepository.update(
                id,
                updateUserDto
            );

            if (updateResult.affected === 0) {
                throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
            }

            await this._logger.logToDB(
                ActionType.UPDATE,
                ENTITIES.USER,
                id,
                updateUserDto
            );
        } catch (err) {
            this._logger.error(err.message);
            if (err instanceof NotFoundException) {
                throw err;
            }
            throw new BadRequestException(err.message);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const deleteResult = await this._userRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
            }

            await this._logger.logToDB(
                ActionType.DELETE,
                ENTITIES.USER,
                id,
                null
            );
        } catch (err) {
            this._logger.error(err.message);
            if (err instanceof NotFoundException) {
                throw err;
            }
            throw new BadRequestException(err.message);
        }
    }
}
