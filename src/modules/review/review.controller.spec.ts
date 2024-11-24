import { ReviewController } from './review.controller.js';
import { ReviewService } from './review.service.js';
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import {
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { GetReviewsQueryDto } from './dto/get-reviews-query.dto.js';
import { ReviewDto } from './dto/review.dto.js';
import { VinylDto } from '../vinyl/dto/vinyl.dto.js';
import { UserDto } from '../user/dto/user.dto.js';

const reviews1: ReviewDto[] = [
    {
        id: 1,
        score: 5,
        comment: 'Oh, my youth',
        vinyl: {} as VinylDto,
        user: {} as UserDto,
    },
    {
        id: 2,
        score: 4,
        comment: 'Mesmerize was better',
        vinyl: {} as VinylDto,
        user: {} as UserDto,
    },
];

const validCreateReviewDto: CreateReviewDto = {
    score: 5,
    comment: 'Great album!',
};

const invalidCreateReviewDto: CreateReviewDto = {
    score: -1,
    comment: 'Great album!',
};

describe('ReviewController', () => {
    let reviewController: ReviewController;
    let mockReviewService: ReviewService;

    beforeEach(() => {
        mockReviewService = {
            findAllByVinylId: async (
                query: GetReviewsQueryDto,
                vinylId: string
            ): Promise<ReviewDto[]> => {
                if (vinylId === '1') {
                    return reviews1 as ReviewDto[];
                } else if (vinylId === '999') {
                    throw new BadRequestException('Invalid vinyl ID');
                } else {
                    throw new Error('Unexpected error');
                }
            },
            create: async (
                vinylId: string,
                userId: string,
                createReviewDto: CreateReviewDto
            ) => {
                if (vinylId === '1' && createReviewDto.score > 0) {
                    return;
                } else if (createReviewDto.score <= 0) {
                    throw new BadRequestException('Invalid score');
                } else {
                    throw new Error('Unexpected error');
                }
            },
            delete: async (reviewId: string) => {
                if (reviewId === '1') {
                    return;
                } else if (reviewId === '999') {
                    throw new NotFoundException('Review not found');
                } else if (reviewId === 'invalid') {
                    throw new BadRequestException('Invalid review ID');
                } else {
                    throw new Error('Unexpected error');
                }
            },
        } as unknown as ReviewService;

        reviewController = new ReviewController(mockReviewService);
    });

    describe('getAllByVinylId', () => {
        const query: GetReviewsQueryDto = { page: 1, pageSize: 10 };

        it('should return reviews for a valid vinyl ID', async () => {
            const result = await reviewController.getAllByVinylId(query, '1');
            assert.deepEqual(result, reviews1);
        });

        it('should throw BadRequestException for invalid vinyl ID', async () => {
            await assert.rejects(
                async () => {
                    await reviewController.getAllByVinylId(query, '999');
                },
                (err) =>
                    err instanceof BadRequestException &&
                    err.message === 'Invalid vinyl ID'
            );
        });

        it('should throw InternalServerErrorException for unknown errors', async () => {
            await assert.rejects(
                async () => {
                    await reviewController.getAllByVinylId(query, '3');
                },
                (err) => err instanceof InternalServerErrorException
            );
        });
    });

    describe('create', () => {
        const req = { user: { userId: 'user123' } };

        it('should create a review for a valid vinyl ID and valid review data', async () => {
            const vinylId = '1';
            await assert.doesNotReject(async () => {
                await reviewController.create(
                    vinylId,
                    req,
                    validCreateReviewDto
                );
            });
        });

        it('should throw BadRequestException for invalid review data', async () => {
            const vinylId = '1';
            const invalidReviewDto = invalidCreateReviewDto;

            await assert.rejects(
                async () => {
                    await reviewController.create(
                        vinylId,
                        req,
                        invalidReviewDto
                    );
                },
                (err) =>
                    err instanceof BadRequestException &&
                    err.message === 'Invalid score'
            );
        });

        it('should throw InternalServerErrorException for unknown errors', async () => {
            const vinylId = '999';
            const invalidReviewDto = validCreateReviewDto;

            await assert.rejects(
                async () => {
                    await reviewController.create(
                        vinylId,
                        req,
                        invalidReviewDto
                    );
                },
                (err) => err instanceof InternalServerErrorException
            );
        });
    });

    describe('delete', () => {
        it('should delete a review successfully for a valid review ID', async () => {
            const reviewId = '1';
            await assert.doesNotReject(async () => {
                await reviewController.delete(reviewId);
            });
        });

        it('should throw NotFoundException if the review is not found', async () => {
            const reviewId = '999';
            await assert.rejects(
                async () => {
                    await reviewController.delete(reviewId);
                },
                (err) =>
                    err instanceof NotFoundException &&
                    err.message === 'Review not found'
            );
        });

        it('should throw BadRequestException for invalid review ID format', async () => {
            const reviewId = 'invalid';
            await assert.rejects(
                async () => {
                    await reviewController.delete(reviewId);
                },
                (err) =>
                    err instanceof BadRequestException &&
                    err.message === 'Invalid review ID'
            );
        });

        it('should throw InternalServerErrorException for unexpected errors', async () => {
            const reviewId = null;
            await assert.rejects(
                async () => {
                    await reviewController.delete(reviewId);
                },
                (err) => err instanceof InternalServerErrorException
            );
        });
    });
});
