import { VinylController } from './vinyl.controller.js';
import { VinylService } from './vinyl.service.js';
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { Review } from '../../database/entities/Review.js';
import { ReviewService } from '../review/review.service.js';
import { GetReviewsQueryDto } from '../review/dto/get-reviews-query.dto.js';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from '../review/dto/create-review.dto.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';

const reviews1 = [
    {
        id: 1,
        score: 5,
        comment: 'Oh, my youth',
    },
    {
        id: 2,
        score: 4,
        comment: 'Mesmerize was better',
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

describe('VinylController', () => {
    let vinylController: VinylController;
    let mockVinylService: VinylService;
    let mockReviewService: ReviewService;

    beforeEach(() => {
        mockReviewService = {
            findAllByVinylId: async (
                query: GetReviewsQueryDto,
                vinylId: string
            ): Promise<Review[]> => {
                if (vinylId === '1') {
                    return reviews1 as Review[];
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

        mockVinylService = {
            create: async (createVinylDto: CreateVinylDto) => {
                if (createVinylDto.name === 'Existing Vinyl') {
                    throw new BadRequestException('Vinyl already exists');
                }
                return { id: '1', ...createVinylDto };
            },
            update: async (id: string, updateVinylDto: UpdateVinylDto) => {
                if (id === '999') {
                    throw new NotFoundException('Vinyl not found');
                }
                return { id, ...updateVinylDto };
            },
            delete: async (id: string) => {
                if (id === '999') {
                    throw new NotFoundException('Vinyl not found');
                }
                return { deleted: true };
            },
        } as unknown as VinylService;

        vinylController = new VinylController(
            mockVinylService,
            mockReviewService
        );
    });

    describe('getReviewsByVinylId', () => {
        const query: GetReviewsQueryDto = { page: 1, pageSize: 10 };

        it('should return reviews for a valid vinyl ID', async () => {
            const result = await vinylController.getReviewsByVinylId(
                query,
                '1'
            );
            assert.deepEqual(result, reviews1);
        });

        it('should throw BadRequestException for invalid vinyl ID', async () => {
            await assert.rejects(
                async () => {
                    await vinylController.getReviewsByVinylId(query, '999');
                },
                (err) => {
                    return (
                        err instanceof BadRequestException &&
                        err.message === 'Invalid vinyl ID'
                    );
                }
            );
        });

        it('should throw InternalServerErrorException for unknown errors', async () => {
            await assert.rejects(
                async () => {
                    await vinylController.getReviewsByVinylId(query, '3');
                },
                (err) => {
                    return err instanceof InternalServerErrorException;
                }
            );
        });
    });

    describe('createReview', () => {
        const userId = 'user123';
        const req = { user: { userId } };

        it('should create a review for a valid vinyl ID and valid review data', async () => {
            const vinylId = '1';
            await assert.doesNotReject(async () => {
                await vinylController.createReview(
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
                    await vinylController.createReview(
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
                    await vinylController.createReview(
                        vinylId,
                        req,
                        invalidReviewDto
                    );
                },
                (err) => err instanceof InternalServerErrorException
            );
        });
    });
    describe('deleteReview', () => {
        it('should delete a review successfully for a valid review ID', async () => {
            const reviewId = '1';
            await assert.doesNotReject(async () => {
                await vinylController.deleteReview(reviewId);
            });
        });

        it('should throw NotFoundException if the review is not found', async () => {
            const reviewId = '999';
            await assert.rejects(
                async () => {
                    await vinylController.deleteReview(reviewId);
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
                    await vinylController.deleteReview(reviewId);
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
                    await vinylController.deleteReview(reviewId);
                },
                (err) => err instanceof InternalServerErrorException
            );
        });
    });
    describe('create', () => {
        it('should create a new vinyl record successfully', async () => {
            const createVinylDto: CreateVinylDto = {
                name: 'New Vinyl',
                author: 'Artist',
                description: 'Description of vinyl',
                price: 20.0,
                coverImage: 'url-to-cover-image',
            };

            const result = await vinylController.create(createVinylDto);
            assert.deepEqual(result, { id: '1', ...createVinylDto });
        });

        it('should throw BadRequestException if vinyl already exists', async () => {
            const createVinylDto: CreateVinylDto = {
                name: 'Existing Vinyl',
                author: 'Artist',
                description: 'Description of vinyl',
                price: 20.0,
                coverImage: 'url-to-cover-image',
            };

            await assert.rejects(
                async () => {
                    await vinylController.create(createVinylDto);
                },
                (err) =>
                    err instanceof BadRequestException &&
                    err.message === 'Vinyl already exists'
            );
        });
    });

    describe('update', () => {
        it('should update a vinyl record successfully', async () => {
            const updateVinylDto: UpdateVinylDto = {
                name: 'Updated Vinyl',
                author: 'New Artist',
                description: 'Updated description of vinyl',
                price: 25.0,
            };

            const result = await vinylController.update('1', updateVinylDto);
            assert.deepEqual(result, { id: '1', ...updateVinylDto });
        });

        it('should throw NotFoundException if vinyl not found', async () => {
            const updateVinylDto: UpdateVinylDto = {
                name: 'Updated Vinyl',
                author: 'New Artist',
                description: 'Updated description of vinyl',
                price: 25.0,
            };

            await assert.rejects(
                async () => {
                    await vinylController.update('999', updateVinylDto);
                },
                (err) =>
                    err instanceof NotFoundException &&
                    err.message === 'Vinyl not found'
            );
        });
    });

    describe('delete', () => {
        it('should delete a vinyl record successfully', async () => {
            const result = await vinylController.delete('1');
            assert.deepEqual(result, { deleted: true });
        });

        it('should throw NotFoundException if vinyl not found', async () => {
            await assert.rejects(
                async () => {
                    await vinylController.delete('999');
                },
                (err) =>
                    err instanceof NotFoundException &&
                    err.message === 'Vinyl not found'
            );
        });
    });
});
