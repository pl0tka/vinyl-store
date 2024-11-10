import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeLog } from '../database/entities/index.js';

@Injectable()
export class LoggerRepository {
    constructor(
        @InjectRepository(ChangeLog)
        private readonly _repository: Repository<ChangeLog>
    ) {}

    async create(changeLog: ChangeLog): Promise<void> {
        await this._repository.save(changeLog);
    }

    async findAll(): Promise<ChangeLog[]> {
        return await this._repository.find();
    }
}
