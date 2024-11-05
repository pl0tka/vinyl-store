import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository.js';
import { Role } from 'src/database/entities/Role.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';

@Injectable()
export class RoleService {
    constructor(private readonly _roleRepository: RoleRepository) {}

    async findByName(name: string): Promise<Role> {
        const role = await this._roleRepository.findByName(name);

        if (!role) {
            throw new NotFoundException(ERROR_MESSAGES.ROLE_NOT_FOUND);
        }

        return role;
    }
}
