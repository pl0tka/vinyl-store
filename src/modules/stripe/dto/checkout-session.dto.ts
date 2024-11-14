import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class CheckoutSessionDto {
    @ApiProperty({ example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER })
    @IsNumber()
    @IsPositive()
    id: number;

    @ApiProperty({ example: DTO_CONSTANTS.PRICE_EXAMPLE })
    @IsNumber()
    @IsPositive()
    price: number;
}
