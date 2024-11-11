import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Vinyl } from '../../database/entities/index.js';
import { GetVinylsQueryDto } from './dto/get-vinyls-query.dto.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';
import { PAGINATION } from '../../common/constants/query.constants.js';
import { Review } from '../../database/entities/index.js';
import { VinylWithScoreAndReview } from './interfaces/vinyl-wth-score-and-review.js';

@Injectable()
export class VinylRepository {
    constructor(
        @InjectRepository(Vinyl)
        private readonly _repository: Repository<Vinyl>
    ) {}

    async findAllWithAvgScoreAndFirstReview(
        queryDto: GetVinylsQueryDto
    ): Promise<VinylWithScoreAndReview[] | null> {
        const page = queryDto.page || PAGINATION.DEFAULT_PAGE;
        const pageSize = queryDto.pageSize || PAGINATION.DEFAULT_PAGE_SIZE;

        const vinyls: VinylWithScoreAndReview[] = await this._repository
            .createQueryBuilder('vinyl')
            .leftJoinAndSelect('vinyl.reviews', 'review')
            .select([
                'vinyl.id AS id',
                'vinyl.name AS name',
                'vinyl.author AS author',
                'vinyl.description AS description',
                'vinyl.price AS price',
                'vinyl.coverImage AS coverImage',
                'AVG(review.score) AS averageScore',
            ])
            .addSelect((subQuery) => {
                return subQuery
                    .select('review.comment')
                    .from(Review, 'review')
                    .where('review.vinylId = vinyl.id')
                    .orderBy('review.id', 'ASC')
                    .limit(1);
            }, 'firstReviewComment')
            .groupBy('vinyl.id')
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getRawMany();
        return vinyls;
    }

    async findById(id: number): Promise<Vinyl | null> {
        return await this._repository.findOneBy({ id });
    }

    async create(vinyl: CreateVinylDto): Promise<Vinyl> {
        const newVinyl = this._repository.create(vinyl);
        return await this._repository.save(newVinyl);
    }

    async update(
        id: string,
        updateVinylDto: UpdateVinylDto
    ): Promise<UpdateResult> {
        return await this._repository.update(Number(id), updateVinylDto);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this._repository.delete(Number(id));
    }
}
