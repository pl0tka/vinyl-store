import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/index.js';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly _repository: Repository<User>
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this._repository.findOne({
            where: { email },
            relations: ['roles'],
        });
    }

    async create(user: User): Promise<void> {
        const newUser = this._repository.create(user);
        await this._repository.save(newUser);
    }
}
