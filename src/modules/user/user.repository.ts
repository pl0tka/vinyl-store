import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserRelations } from './types/types.js';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly _repository: Repository<User>
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this._repository.findOneBy({ email });
    }

    async findByEmailWithRelations(
        email: string,
        relationOptions?: UserRelations[]
    ): Promise<User | null> {
        const relations = relationOptions || [];

        return await this._repository.findOne({
            where: { email },
            relations,
        });
    }

    async findById(
        id: string,
        relationOptions?: UserRelations[]
    ): Promise<User | null> {
        const relations = relationOptions || [];

        return await this._repository.findOne({
            where: { id },
            relations,
        });
    }

    async create(user: User): Promise<User> {
        const newUser = this._repository.create(user);
        return await this._repository.save(newUser);
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto
    ): Promise<UpdateResult> {
        return await this._repository.update(id, updateUserDto);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this._repository.delete(id);
    }
}
