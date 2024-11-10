import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { ReviewRepository } from './review.repository.js';
import { LoggerService } from '../../logger/logger.service.js';
import { Review } from '../../database/entities/index.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { GetReviewsQueryDto } from './dto/get-reviews-query.dto.js';
import { ActionType } from '../../database/entities/ChangeLog.js';

@Injectable()
export class ReviewService {
    constructor(
        private readonly _logger: LoggerService,
        private readonly _reviewRepository: ReviewRepository
    ) {
        this._logger.setContext(ReviewService.name);
    }

    async findAllByVinylId(
        query: GetReviewsQueryDto,
        vinylId: string
    ): Promise<Review[]> {
        try {
            return await this._reviewRepository.findAllByVinylId(
                query,
                vinylId
            );
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async create(
        vinylId: string,
        userId: string,
        createReviewDto: CreateReviewDto
    ): Promise<void> {
        try {
            await this._reviewRepository.create(
                vinylId,
                userId,
                createReviewDto
            );
            await this._logger.logToDB(
                ActionType.CREATE,
                'Review',
                userId,
                null,
                {
                    vinylId,
                    createReviewDto,
                }
            );
        } catch (err) {
            this._logger.error(err.message);
            throw new BadRequestException(err.message);
        }
    }

    async delete(reviewId: string): Promise<void> {
        try {
            const deleteResult = await this._reviewRepository.delete(reviewId);
            if (deleteResult.affected === 0) {
                throw new NotFoundException(ERROR_MESSAGES.REVIEW_NOT_FOUND);
            }
        } catch (err) {
            this._logger.error(err.message);
            if (err instanceof NotFoundException) {
                throw err;
            }
            throw new BadRequestException(err.message);
        }
    }
}
