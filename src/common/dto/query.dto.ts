import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortOrder } from '../constants/query.constants.js';
import { ApiProperty } from '@nestjs/swagger';
import { DTO_CONSTANTS } from '../swagger/constants/dto.js';

export class GeneralQueryDto {
    @ApiProperty({ example: DTO_CONSTANTS.QUERY_PAGE_EXAMPLE })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @ApiProperty({ example: DTO_CONSTANTS.QUERY_PAGE_SIZE_EXAMPLE })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageSize?: number;

    @ApiProperty({ example: DTO_CONSTANTS.QUERY_SORT_BY_EXAMPLE })
    @IsOptional()
    sortBy?: string;

    @ApiProperty({
        enum: SortOrder,
        example: DTO_CONSTANTS.QUERY_SORT_ORDER_EXAMPLE,
    })
    @IsEnum(SortOrder)
    @IsOptional()
    sortOrder?: SortOrder = SortOrder.ASC;

    @ApiProperty({ example: DTO_CONSTANTS.QUERY_FILTER_BY_EXAMPLE })
    @IsOptional()
    filterBy?: Record<string, string>;
}
