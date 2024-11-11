import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { GeneralQueryDto } from '../dto/query.dto.js';
import { PAGINATION, SortOrder } from '../constants/query.constants.js';

export class QueryService {
    protected allowedFilterFields: string[];
    protected allowedSortFields: string[];

    async findAllWithQueryOptions<T>(
        repository: Repository<T>,
        query: GeneralQueryDto
    ): Promise<T[]> {
        const where = this.createWhereQuery<T>(query);
        const order = this.createOrderQuery(query);

        const paginatedResults = await this.getPaginated(
            repository,
            query,
            where,
            order
        );
        return paginatedResults;
    }

    protected createOrderQuery(query: GeneralQueryDto) {
        const order: any = {};

        if (query.sortBy && this.allowedSortFields.includes(query.sortBy)) {
            order[query.sortBy] = query.sortOrder || SortOrder.ASC;
        }

        return order;
    }

    protected createWhereQuery<T>(query: GeneralQueryDto): FindOptionsWhere<T> {
        const where: FindOptionsWhere<T> = {};

        if (query.filterBy) {
            for (const [key, value] of Object.entries(query.filterBy)) {
                if (this.allowedFilterFields.includes(key)) {
                    where[key] = ILike(`%${value}%`);
                }
            }
        }

        return where;
    }

    protected async getPaginated<T>(
        repository: Repository<T>,
        query: GeneralQueryDto,
        where: FindOptionsWhere<T>,
        order?: any
    ) {
        const page = query.page || PAGINATION.DEFAULT_PAGE;
        const pageSize = query.pageSize || PAGINATION.DEFAULT_PAGE_SIZE;

        return await repository.find({
            order,
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: where,
        });
    }
}
