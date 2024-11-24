import { VinylController } from './vinyl.controller.js';
import { VinylService } from './vinyl.service.js';
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';

describe('VinylController', () => {
    let vinylController: VinylController;
    let mockVinylService: VinylService;

    beforeEach(() => {
        mockVinylService = {
            findAll: async () => [
                {
                    id: '1',
                    name: 'Vinyl 1',
                    author: 'Artist 1',
                    description: 'Vinyl Description 1',
                    price: 20.0,
                    coverImage: 'cover-image',
                },
                {
                    id: '2',
                    name: 'Vinyl 2',
                    author: 'Artist 2',
                    description: 'Vinyl Description 2',
                    price: 25.0,
                    coverImage: 'cover-image',
                },
            ],
            findAllWithAvgScoreAndFirstReview: async () => [
                {
                    id: '1',
                    name: 'Vinyl 1',
                    author: 'Artist 1',
                    avgScore: 4.5,
                    firstReview: {
                        score: 5,
                        comment: 'Great album!',
                    },
                    price: 20.0,
                    coverImage: 'cover-image',
                },
                {
                    id: '2',
                    name: 'Vinyl 2',
                    author: 'Artist 2',
                    avgScore: 4.0,
                    firstReview: {
                        score: 4,
                        comment: 'Not bad!',
                    },
                    price: 25.0,
                    coverImage: 'cover-image',
                },
            ],
            create: async (createVinylDto: CreateVinylDto) => {
                if (createVinylDto.name === 'Existing Vinyl') {
                    throw new BadRequestException('Vinyl already exists');
                }
                return;
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

        vinylController = new VinylController(mockVinylService);
    });

    describe('getAll', () => {
        it('should return a list of vinyls', async () => {
            const result = await vinylController.getAll({
                page: 1,
                pageSize: 10,
            });
            assert.deepEqual(result, [
                {
                    id: '1',
                    name: 'Vinyl 1',
                    author: 'Artist 1',
                    description: 'Vinyl Description 1',
                    price: 20.0,
                    coverImage: 'cover-image',
                },
                {
                    id: '2',
                    name: 'Vinyl 2',
                    author: 'Artist 2',
                    description: 'Vinyl Description 2',
                    price: 25.0,
                    coverImage: 'cover-image',
                },
            ]);
        });

        describe('getAllWithAvgScoreAndFirstReview', () => {
            it('should return a list of vinyls with average score and first review', async () => {
                const result =
                    await vinylController.getAllWithAvgScoreAndFirstReview({
                        page: 1,
                        pageSize: 10,
                    });
                assert.deepEqual(result, [
                    {
                        id: '1',
                        name: 'Vinyl 1',
                        author: 'Artist 1',
                        avgScore: 4.5,
                        firstReview: {
                            score: 5,
                            comment: 'Great album!',
                        },
                        price: 20.0,
                        coverImage: 'cover-image',
                    },
                    {
                        id: '2',
                        name: 'Vinyl 2',
                        author: 'Artist 2',
                        avgScore: 4.0,
                        firstReview: {
                            score: 4,
                            comment: 'Not bad!',
                        },
                        price: 25.0,
                        coverImage: 'cover-image',
                    },
                ]);
            });
        });

        describe('create', () => {
            it('should create a new vinyl record successfully', async () => {
                const createVinylDto: CreateVinylDto = {
                    name: 'New Vinyl',
                    author: 'Artist',
                    description: 'Description of vinyl',
                    price: 20.0,
                    coverImage: 'cover-image',
                };

                assert.doesNotReject(async () => {
                    await vinylController.create(createVinylDto);
                });
            });

            it('should throw BadRequestException if vinyl already exists', async () => {
                const createVinylDto: CreateVinylDto = {
                    name: 'Existing Vinyl',
                    author: 'Artist',
                    description: 'Description of vinyl',
                    price: 20.0,
                    coverImage: 'cover-image',
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

                const result = await vinylController.update(
                    '1',
                    updateVinylDto
                );
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
});
