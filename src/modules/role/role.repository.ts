import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../../database/entities/index.js';

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly _repository: Repository<Role>
    ) {}

    async findByName(name: string): Promise<Role> {
        return await this._repository.findOneBy({
            name,
        });
    }
}
