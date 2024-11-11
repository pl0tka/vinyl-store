import { UserController } from './user.controller.js';
import { beforeEach, describe, it } from 'node:test';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import {
    BadRequestException,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import assert from 'node:assert';
import { User } from 'src/database/entities/User.js';

const mockUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    reviews: [],
    orders: [],
} as User;

describe('UserController', () => {
    let userController: UserController;
    let mockUserService: Partial<UserService>;

    beforeEach(() => {
        mockUserService = {
            findByIdWithReviewsAndOrders: async (userId: string) => {
                if (userId === '1') return mockUser;
                if (userId === '404')
                    throw new NotFoundException('User not found');
                throw new BadRequestException('Database connection error');
            },
            update: async (userId: string, updateData: UpdateUserDto) => {
                if (userId === '404')
                    throw new NotFoundException('User not found');
                if (userId === 'conflict')
                    throw new ConflictException('User email already exists');
                return;
            },
            delete: async (userId: string) => {
                if (userId === '404')
                    throw new NotFoundException('User not found');
                return;
            },
        };

        userController = new UserController(mockUserService as UserService);
    });

    describe('get()', () => {
        const mockRequest = { user: { userId: '1' } } as any;

        it('should retrieve the user successfully', async () => {
            const result = await userController.get(mockRequest);
            assert.deepEqual(result, mockUser);
        });

        it('should throw NotFoundException if user is not found', async () => {
            const req = { user: { userId: '404' } } as any;
            await assert.rejects(
                async () => await userController.get(req),
                (err) =>
                    err instanceof NotFoundException &&
                    err.message === 'User not found'
            );
        });

        it('should throw BadRequestException for unexpected errors', async () => {
            const req = { user: { userId: '2' } } as any;
            await assert.rejects(
                async () => await userController.get(req),
                (err) =>
                    err instanceof BadRequestException &&
                    err.message === 'Database connection error'
            );
        });
    });

    describe('update()', () => {
        const mockRequest = { user: { userId: '1' } } as any;
        const updateDto: UpdateUserDto = {
            firstName: 'Updated Name',
            lastName: 'Updated Surname',
        } as UpdateUserDto;

        it('should update the user successfully', async () => {
            await assert.doesNotReject(
                async () => await userController.update(mockRequest, updateDto)
            );
        });

        it('should throw NotFoundException if user is not found', async () => {
            const req = { user: { userId: '404' } } as any;
            await assert.rejects(
                async () => await userController.update(req, updateDto),
                (err) =>
                    err instanceof NotFoundException &&
                    err.message === 'User not found'
            );
        });

        it('should throw ConflictException if email already exists', async () => {
            const req = { user: { userId: 'conflict' } } as any;
            await assert.rejects(
                async () => await userController.update(req, updateDto),
                (err) =>
                    err instanceof ConflictException &&
                    err.message === 'User email already exists'
            );
        });
    });

    describe('delete()', () => {
        const mockRequest = { user: { userId: '1' } } as any;

        it('should delete the user successfully', async () => {
            await assert.doesNotReject(
                async () => await userController.delete(mockRequest)
            );
        });

        it('should throw NotFoundException if user is not found', async () => {
            const req = { user: { userId: '404' } } as any;
            await assert.rejects(
                async () => await userController.delete(req),
                (err) =>
                    err instanceof NotFoundException &&
                    err.message === 'User not found'
            );
        });
    });
});
