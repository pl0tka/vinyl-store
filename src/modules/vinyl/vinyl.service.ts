import { Injectable, NotFoundException } from '@nestjs/common';
import { VinylRepository } from './vinyl.repository.js';
import { GetVinylsQueryDto } from './dto/get-vinyls-query.dto.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { GetVinylsWithScoreAndReviewDto } from './dto/get-vinyls-with-score-and-review.dto.js';

@Injectable()
export class VinylService {
    constructor(private readonly _vinylRepository: VinylRepository) {}

    async findById(id: number) {
        return await this._vinylRepository.findById(id);
    }

    async findAllWithAvgScoreAndFirstReview(
        query: GetVinylsQueryDto
    ): Promise<GetVinylsWithScoreAndReviewDto[]> {
        return await this._vinylRepository.findAllWithAvgScoreAndFirstReview(
            query
        );
    }

    async create(createVinylDto: CreateVinylDto): Promise<void> {
        await this._vinylRepository.create(createVinylDto);
    }

    async update(id: string, updateVinylDto: UpdateVinylDto) {
        const updateResult = await this._vinylRepository.update(
            id,
            updateVinylDto
        );

        if (updateResult.affected === 0) {
            throw new NotFoundException(ERROR_MESSAGES.VINYL_NOT_FOUND);
        }
    }

    async delete(id: string) {
        const deleteResult = await this._vinylRepository.delete(id);

        if (deleteResult.affected === 0) {
            throw new NotFoundException(ERROR_MESSAGES.VINYL_NOT_FOUND);
        }
    }
}
