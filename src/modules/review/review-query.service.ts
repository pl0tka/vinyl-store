import { Injectable } from '@nestjs/common';
import { QueryService } from '../../common/services/query.service.js';
import { Repository } from 'typeorm';
import { Review } from '../../database/entities/index.js';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralQueryDto } from '../../common/dto/query.dto.js';

@Injectable()
export class ReviewQueryService extends QueryService {
    constructor(
        @InjectRepository(Review)
        private readonly _vinylRepository: Repository<Review>
    ) {
        super();
    }

    async findAllByVinylIdPaginated(
        query: GeneralQueryDto,
        vinylId: string
    ): Promise<Review[]> {
        const where = { vinyl: { id: Number(vinylId) } };
        return await this.getPaginated<Review>(
            this._vinylRepository,
            query,
            where
        );
    }
}
