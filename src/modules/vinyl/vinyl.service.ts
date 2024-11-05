import { Injectable } from '@nestjs/common';
import { VinylRepository } from './vinyl.repository.js';
import { VinylGetQueryDto } from './dto/get-query.dto.js';

@Injectable()
export class VinylService {
    constructor(private readonly _vinylRepository: VinylRepository) {}

    async findAll(queryDto: VinylGetQueryDto) {
        return await this._vinylRepository.findAll(queryDto);
    }
}
