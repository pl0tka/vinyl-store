import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetReviewsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public pageSize?: number;
}
