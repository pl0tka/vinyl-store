import { ApiProperty } from '@nestjs/swagger';
import { VinylOrderDto } from './vinyl-order.dto.js';

export class CreateOrderDto {
    @ApiProperty({ type: VinylOrderDto })
    vinyls: VinylOrderDto[];
}
