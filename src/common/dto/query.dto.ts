import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortOrder } from '../constants/query.constants.js';

export class GeneralQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public pageSize?: number;

    @IsOptional()
    public sortBy?: string;

    @IsEnum(SortOrder)
    @IsOptional()
    public sortOrder?: SortOrder = SortOrder.ASC;

    @IsOptional()
    filterBy?: Record<string, string>;
}
