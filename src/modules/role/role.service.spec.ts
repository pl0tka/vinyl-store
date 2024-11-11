import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, it } from 'node:test';
import { RoleService } from './role.service.js';
import { RoleRepository } from './role.repository.js';
import assert from 'node:assert';
import { ERROR_MESSAGES } from 'src/common/constants/constants.js';

let roleService: RoleService;
let mockRoleRepository: RoleRepository;

beforeEach(() => {
    mockRoleRepository = {
        findByName: async (name: string) => {
            if (name === 'admin') {
                return { id: '1', name: 'admin' };
            } else if (name === 'user') {
                return { id: '2', name: 'user' };
            } else {
                return null;
            }
        },
    } as unknown as RoleRepository;

    roleService = new RoleService(mockRoleRepository);
});

describe('RoleService', () => {
    describe('findByName', () => {
        it('should return role when role name exists', async () => {
            const role = await roleService.findByName('admin');
            assert.deepEqual(role?.name, 'admin');
            assert.deepEqual(role?.id, '1');
        });

        it('should throw NotFoundException if role does not exist', async () => {
            try {
                await roleService.findByName('manager');
            } catch (err) {
                assert.ok(err instanceof NotFoundException);
                assert.strictEqual(err.message, ERROR_MESSAGES.ROLE_NOT_FOUND);
            }
        });
    });
});
