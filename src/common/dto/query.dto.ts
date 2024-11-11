import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortOrder } from '../constants/query.constants.js';

export class GeneralQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageSize?: number;

    @IsOptional()
    sortBy?: string;

    @IsEnum(SortOrder)
    @IsOptional()
    sortOrder?: SortOrder = SortOrder.ASC;

    @IsOptional()
    filterBy?: Record<string, string>;
}
