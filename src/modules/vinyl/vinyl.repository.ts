import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Vinyl } from '../../database/entities/index.js';
import { VinylQueryService } from './vinyl-query.service.js';
import { VinylGetQueryDto } from './dto/get-query.dto.js';

@Injectable()
export class VinylRepository {
    constructor(
        @InjectRepository(Vinyl)
        private readonly _repository: Repository<Vinyl>,
        private readonly _vinylQueryService: VinylQueryService
    ) {}

    async findAll(queryDto: VinylGetQueryDto): Promise<Vinyl[] | null> {
        return await this._vinylQueryService.findAllVinylsWithQueryOptions(
            queryDto
        );
    }

    async findById(id: string): Promise<Vinyl | null> {
        return await this._repository.findOne({ where: { id } });
    }
}
