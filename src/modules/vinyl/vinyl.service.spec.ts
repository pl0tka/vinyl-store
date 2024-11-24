import { BadRequestException, NotFoundException } from '@nestjs/common';
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { VinylService } from './vinyl.service.js';
import { VinylRepository } from './vinyl.repository.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';
import { DeleteResult, UpdateResult } from 'typeorm';
import { LoggerService } from '../../logger/logger.service.js';
import { Vinyl } from '../../database/entities/Vinyl.js';

const vinyl1: Vinyl = {
    id: 1,
    name: 'Hypnotize',
    author: 'System of a down',
    description:
        'Hypnotize is the fifth studio album by the American heavy metal band System of a Down.',
    price: 30.0,
    coverImage: '',
    reviews: [],
    orders: [],
};

describe('VinylService', () => {
    let vinylService: VinylService;
    let mockVinylRepository: VinylRepository;
    let mockLoggerService: LoggerService;

    beforeEach(() => {
        mockVinylRepository = {
            findById: async (id: number) => {
                return id === 1 ? vinyl1 : null;
            },
            findAll: async () => [vinyl1],
            create: async (vinyl: CreateVinylDto) => {
                if (
                    !vinyl.name ||
                    !vinyl.author ||
                    typeof vinyl.price !== 'number'
                ) {
                    throw new BadRequestException('Invalid vinyl data');
                }
            },
            update: async (
                id: string,
                updateVinylDto: UpdateVinylDto
            ): Promise<UpdateResult> => {
                if (id === '1') {
                    return { affected: 1 } as UpdateResult;
                }
                return { affected: 0 } as UpdateResult;
            },
            delete: async (id: string) => {
                if (id === '1') {
                    return { affected: 1 } as DeleteResult;
                }
                return { affected: 0 } as DeleteResult;
            },
        } as unknown as VinylRepository;

        mockLoggerService = {
            setContext: () => {},
            logToDB: () => {},
            error: () => {},
        } as unknown as LoggerService;

        vinylService = new VinylService(mockVinylRepository, mockLoggerService);
    });

    describe('Find All Vinyls', () => {
        it('should return an array of vinyls', async () => {
            const result = await vinylService.findAll({});
            assert.deepEqual(result, [vinyl1]);
        });

        it('should return an empty array when no vinyls are found', async () => {
            mockVinylRepository.findAll = async () => [];
            const result = await vinylService.findAll({});
            assert.deepEqual(result, []);
        });
    });

    describe('Find by Vinyl ID', () => {
        it('should return a vinyl object for a valid ID', async () => {
            const result = await vinylService.findById(1);
            assert.deepEqual(result, vinyl1);
        });

        it('should return null for an invalid ID', async () => {
            const result = await vinylService.findById(999);
            assert.equal(result, null);
        });
    });

    describe('Create Vinyl', () => {
        const invalidCreateVinylDto: CreateVinylDto = {
            name: '',
            author: 'Artist',
            description: 'Description of vinyl',
            price: -10.0,
            coverImage: 'url-to-cover-image',
        };

        it('should throw BadRequestException for invalid vinyl data', async () => {
            await assert.rejects(
                async () => {
                    await vinylService.create(invalidCreateVinylDto);
                },
                (err) => {
                    return (
                        err instanceof BadRequestException &&
                        err.message === 'Invalid vinyl data'
                    );
                }
            );
        });
    });

    describe('Update Vinyl by ID', () => {
        const updateVinylDto: UpdateVinylDto = {
            price: 30.99,
        };

        it('should update a vinyl successfully for an existing ID', async () => {
            await assert.doesNotReject(async () => {
                await vinylService.update('1', updateVinylDto);
            });
        });

        it('should throw NotFoundException for non-existent vinyl ID', async () => {
            await assert.rejects(
                async () => {
                    await vinylService.update('999', updateVinylDto);
                },
                (err) => {
                    return (
                        err instanceof NotFoundException &&
                        err.message === 'Vinyl not found'
                    );
                }
            );
        });
    });

    describe('Delete Vinyl by ID', () => {
        it('should delete a vinyl successfully for an existing ID', async () => {
            await assert.doesNotReject(async () => {
                await vinylService.delete('1');
            });
        });

        it('should throw NotFoundException for non-existent vinyl ID', async () => {
            await assert.rejects(
                async () => {
                    await vinylService.delete('999');
                },
                (err) => {
                    return (
                        err instanceof NotFoundException &&
                        err.message === 'Vinyl not found'
                    );
                }
            );
        });
    });
});
