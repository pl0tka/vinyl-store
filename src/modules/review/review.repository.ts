import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Review } from '../../database/entities/Review.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { ReviewQueryService } from './review-query.service.js';
import { GetReviewsQueryDto } from './dto/get-reviews-query.dto.js';

@Injectable()
export class ReviewRepository {
    constructor(
        @InjectRepository(Review)
        private readonly _repository: Repository<Review>,
        private readonly _reviewQueryService: ReviewQueryService
    ) {}

    async findAllByVinylId(
        query: GetReviewsQueryDto,
        vinylId: string
    ): Promise<Review[]> {
        return await this._reviewQueryService.findAllByVinylIdPaginated(
            query,
            vinylId
        );
    }

    async create(
        vinylId: string,
        userId: string,
        createReviewDto: CreateReviewDto
    ): Promise<void> {
        const { score, comment } = createReviewDto;
        const newReview = this._repository.create({
            score,
            comment,
            user: { id: userId },
            vinyl: { id: Number(vinylId) },
        });

        await this._repository.save(newReview);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this._repository.delete(id);
    }
}
