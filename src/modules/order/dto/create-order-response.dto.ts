import { ApiProperty } from '@nestjs/swagger';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class CreateOrderResponseDto {
    @ApiProperty({ example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER })
    id: number;
    @ApiProperty({ example: DTO_CONSTANTS.PRICE_EXAMPLE })
    price: number;
}
