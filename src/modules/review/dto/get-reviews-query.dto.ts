import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class GetReviewsQueryDto {
    @ApiProperty({
        required: false,
        example: DTO_CONSTANTS.QUERY_PAGE_EXAMPLE,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public page?: number;

    @ApiProperty({
        required: false,
        example: DTO_CONSTANTS.QUERY_PAGE_SIZE_EXAMPLE,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public pageSize?: number;
}
