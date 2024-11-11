import { beforeEach, describe, it } from 'node:test';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { LoggerService } from '../../logger/logger.service.js';
import { User } from '../../database/entities/User.js';
import assert from 'node:assert';
import { ERROR_MESSAGES } from 'src/common/constants/constants.js';
import { BadRequestException } from '@nestjs/common';

let userService: UserService;
let mockUserRepository: UserRepository;
let mockLoggerService: LoggerService;

beforeEach(() => {
    mockUserRepository = {
        findByEmail: async (email: string) => {
            return email === 'existing@example.com'
                ? ({ id: '1', email: 'existing@example.com' } as User)
                : null;
        },
        findById: async (id: string) => {
            return id === '1'
                ? ({ id: '1', email: 'existing@example.com' } as User)
                : null;
        },
        create: async (user: User) => {
            if (user.email === 'existing@example.com') {
                throw new BadRequestException(ERROR_MESSAGES.USER_EMAIL_EXISTS);
            }
            return user;
        },
        update: async (id: string, updateUserDto: any) => {
            if (id === '1') {
                return { affected: 1 };
            } else {
                return { affected: 0 };
            }
        },
        delete: async (id: string) => {
            if (id === '1') {
                return { affected: 1 };
            } else {
                return { affected: 0 };
            }
        },
    } as unknown as UserRepository;

    mockLoggerService = {
        setContext: () => {},
        logToDB: () => {},
        error: () => {},
    } as unknown as LoggerService;

    userService = new UserService(mockUserRepository, mockLoggerService);
});

describe('UserService', () => {
    describe('Create user', () => {
        const validUser: User = {
            id: '2',
            email: 'newuser@example.com',
            firstName: '',
            lastName: '',
            password: '',
            birthday: undefined,
            avatar: '',
            roles: [],
            reviews: [],
            orders: [],
        };

        it('should CREATE a user if valid data is provided', async () => {
            await assert.doesNotReject(async () => {
                await userService.create(validUser);
            });
        });
    });

    describe('Update user', () => {
        const updateUserDto = {
            email: 'updated@example.com',
            firstName: 'Updated',
            lastName: 'User',
            birthday: new Date(1990),
            avatar: '',
        };

        it('should update user when valid id is provided', async () => {
            await assert.doesNotReject(async () => {
                await userService.update('1', updateUserDto);
            });
        });
    });

    describe('Delete user', () => {
        it('should delete user when valid id is provided', async () => {
            await assert.doesNotReject(async () => {
                await userService.delete('1');
            });
        });
    });

    describe('Find user by email', () => {
        it('should return user when email exists', async () => {
            const user = await userService.findByEmail('existing@example.com');
            assert.deepEqual(user?.email, 'existing@example.com');
        });

        it('should return null when email does not exist', async () => {
            const user = await userService.findByEmail(
                'nonexistent@example.com'
            );
            assert.strictEqual(user, null);
        });
    });

    describe('Find user by id', () => {
        it('should return user when id exists', async () => {
            const user = await userService.findById('1');
            assert.deepEqual(user?.id, '1');
        });

        it('should return null when id does not exist', async () => {
            const user = await userService.findById('999');
            assert.strictEqual(user, null);
        });
    });
});
