import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { VinylRepository } from './vinyl.repository.js';
import { GetVinylsQueryDto } from './dto/get-vinyls-query.dto.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { GetVinylsWithScoreAndReviewDto } from './dto/get-vinyls-with-score-and-review.dto.js';
import { ActionType } from '../../database/entities/ChangeLog.js';
import { LoggerService } from '../../logger/logger.service.js';
import { ENTITIES } from '../../database/entities/constants/entities.js';

@Injectable()
export class VinylService {
    constructor(
        private readonly _vinylRepository: VinylRepository,
        private readonly _logger: LoggerService
    ) {
        this._logger.setContext(VinylService.name);
    }

    async findById(id: number) {
        return await this._vinylRepository.findById(id);
    }

    async findAll(query: GetVinylsQueryDto) {
        return await this._vinylRepository.findAll(query);
    }

    async findAllWithAvgScoreAndFirstReview(
        query: GetVinylsQueryDto
    ): Promise<GetVinylsWithScoreAndReviewDto[]> {
        const res =
            await this._vinylRepository.findAllWithAvgScoreAndFirstReview(
                query
            );
        return res;
    }

    async create(createVinylDto: CreateVinylDto): Promise<void> {
        try {
            const createdVinyl =
                await this._vinylRepository.create(createVinylDto);
            await this._logger.logToDB(
                ActionType.CREATE,
                ENTITIES.VINYL,
                createdVinyl.id,
                createdVinyl
            );
        } catch (err) {
            this._logger.error(err.message);
            throw new BadRequestException(err.message);
        }
    }

    async update(id: string, updateVinylDto: UpdateVinylDto) {
        try {
            const updateResult = await this._vinylRepository.update(
                id,
                updateVinylDto
            );

            if (updateResult.affected === 0) {
                throw new NotFoundException(ERROR_MESSAGES.VINYL_NOT_FOUND);
            }

            await this._logger.logToDB(
                ActionType.UPDATE,
                ENTITIES.VINYL,
                id,
                updateVinylDto
            );
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err;
            }

            this._logger.error(err.message);
            throw new BadRequestException(err.message);
        }
    }

    async delete(id: string) {
        try {
            const deleteResult = await this._vinylRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new NotFoundException(ERROR_MESSAGES.VINYL_NOT_FOUND);
            }

            await this._logger.logToDB(
                ActionType.DELETE,
                ENTITIES.VINYL,
                id,
                null
            );
        } catch (err) {
            this._logger.error(err.message);
            if (err instanceof NotFoundException) {
                throw err;
            }
            throw new BadRequestException(err.message);
        }
    }
}
