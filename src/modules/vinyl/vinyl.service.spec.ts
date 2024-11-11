import { VinylService } from './vinyl.service.js';
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { Vinyl } from '../../database/entities/Vinyl.js';
import { Review } from '../../database/entities/Review.js';
import { VinylRepository } from './vinyl.repository.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service.js';

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

const vinyl1: Vinyl = {
    id: 1,
    name: 'Hypnotize',
    author: 'System of a down',
    description:
        'Hypnotize is the fifth studio album by the American heavy metal band System of a Down. Debuted at number one on the Billboard 200 chart.',
    price: 30.0,
    coverImage: '',
    reviews: reviews1 as Review[],
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
            create: async (vinyl: CreateVinylDto) => {
                if (
                    !vinyl.name ||
                    !vinyl.author ||
                    typeof vinyl.price !== 'number'
                )
                    return { ...vinyl, id: 2 } as Vinyl;
                {
                    throw new BadRequestException('Invalid vinyl data');
                }
            },
            update: async (
                id: string,
                updateVinylDto: UpdateVinylDto
            ): Promise<UpdateResult> => {
                if (id === '1') {
                    return { affected: 1 } as UpdateResult;
                } else {
                    return { affected: 0 } as UpdateResult;
                }
            },
            delete: async (id: string) => {
                if (id === '1') {
                    return { affected: 1 } as DeleteResult;
                } else {
                    return { affected: 0 } as DeleteResult;
                }
            },
        } as unknown as VinylRepository;

        mockLoggerService = {
            setContext: () => {},
            logToDB: () => {},
            error: () => {},
        } as unknown as LoggerService;

        vinylService = new VinylService(mockVinylRepository, mockLoggerService);
    });

    describe('Find by vynil ID', () => {
        it('should return Vinyl object with the specified id', async () => {
            const result = await vinylService.findById(1);
            assert.deepEqual(result, vinyl1);
        });

        it('should return null when vinyl ID is not found', async () => {
            const result = await vinylService.findById(999);
            assert.equal(result, null);
        });
    });

    describe('Update vinyl by ID', () => {
        const updateVinylDto = {
            price: 30.99,
        };

        it('should UPDATE Vinyl object with the specified id', async () => {
            await assert.doesNotReject(async () => {
                await vinylService.update('1', updateVinylDto);
            });
        });

        it('should throw NotFoundException if record does not exist', async () => {
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

    describe('Delete vinyl by ID', () => {
        it('should DELETE Vinyl object with the specified id', async () => {
            await assert.doesNotReject(async () => {
                await vinylService.delete('1');
            });
        });

        it('should throw NotFoundException if record does not exist', async () => {
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
