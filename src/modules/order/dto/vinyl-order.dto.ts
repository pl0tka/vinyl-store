import { IsNumber, Min } from 'class-validator';
import { MIN_VINYL_COUNT } from '../../../common/constants/constants.js';
import { ApiProperty } from '@nestjs/swagger';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class VinylOrderDto {
    @ApiProperty({ example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER })
    @IsNumber()
    id: number;

    @ApiProperty({ example: DTO_CONSTANTS.VINYL_COUNT_EXAMPLE })
    @Min(MIN_VINYL_COUNT)
    count: number;
}
