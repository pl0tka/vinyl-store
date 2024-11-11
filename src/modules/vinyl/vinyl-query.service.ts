import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '../../common/services/query.service.js';
import { Vinyl } from '../../database/entities/Vinyl.js';
import { GeneralQueryDto } from '../../common/dto/query.dto.js';

@Injectable()
export class VinylQueryService extends QueryService {
    protected allowedFilterFields = ['name', 'author'];
    protected allowedSortFields = ['name', 'author', 'price'];

    constructor(
        @InjectRepository(Vinyl)
        private readonly _vinylRepository: Repository<Vinyl>
    ) {
        super();
    }

    async getVinylsWithQueryOptions(query: GeneralQueryDto): Promise<Vinyl[]> {
        return this.findAllWithQueryOptions<Vinyl>(
            this._vinylRepository,
            query
        );
    }
}
