import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Vinyl } from '../../database/entities/index.js';
import { VinylQueryService } from './vinyl-query.service.js';
import { GetVinylsQueryDto } from './dto/get-vinyls-query.dto.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';

@Injectable()
export class VinylRepository {
    constructor(
        @InjectRepository(Vinyl)
        private readonly _repository: Repository<Vinyl>,
        private readonly _vinylQueryService: VinylQueryService
    ) {}

    async findAll(queryDto: GetVinylsQueryDto): Promise<Vinyl[] | null> {
        return await this._vinylQueryService.findAllVinylsWithQueryOptions(
            queryDto
        );
    }

    async findById(id: number): Promise<Vinyl | null> {
        return await this._repository.findOne({ where: { id } });
    }

    async create(vinyl: CreateVinylDto): Promise<void> {
        const newVinyl = this._repository.create(vinyl);
        await this._repository.save(newVinyl);
    }

    async update(
        id: string,
        updateVinylDto: UpdateVinylDto
    ): Promise<UpdateResult> {
        return await this._repository.update(id, updateVinylDto);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this._repository.delete(id);
    }
}
