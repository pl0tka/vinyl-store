import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { GeneralQueryDto } from '../dto/query.dto.js';
import { PAGINATION, SortOrder } from '../constants/query.constants.js';

interface QueryResult<T> {
    results: T[];
    resultsCount: number;
}

export class QueryService {
    async findAllWithQueryOptions<T>(
        repository: Repository<T>,
        filter: GeneralQueryDto
    ): Promise<QueryResult<T>> {
        const where = this.createWhereQuery<T>(filter);

        const paginatedResults = await this.getPaginated(
            repository,
            filter,
            where
        );

        return {
            results: paginatedResults[0],
            resultsCount: paginatedResults[1],
        };
    }

    protected createOrderQuery(filter: GeneralQueryDto) {
        const order: any = {};

        if (filter.sortBy) {
            order[filter.sortBy] = filter.sortOrder || SortOrder.ASC;
        }

        return order;
    }

    protected createWhereQuery<T>(
        filter: GeneralQueryDto
    ): FindOptionsWhere<T> {
        const where: FindOptionsWhere<T> = {};

        if (filter.filterBy) {
            for (const [key, value] of Object.entries(filter.filterBy)) {
                where[key] = ILike(`%${value}%`);
            }
        }

        return where;
    }

    protected async getPaginated<T>(
        repository: Repository<T>,
        filter: GeneralQueryDto,
        where: FindOptionsWhere<T>
    ) {
        const page = filter.page || PAGINATION.DEFAULT_PAGE;
        const pageSize = filter.pageSize || PAGINATION.DEFAULT_PAGE_SIZE;

        return await repository.findAndCount({
            order: this.createOrderQuery(filter),
            skip: (page - 1) * (pageSize + 1),
            take: pageSize,
            where: where,
        });
    }
}
