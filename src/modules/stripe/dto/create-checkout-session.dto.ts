import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CheckoutSessionDto } from './checkout-session.dto.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutSessionDto {
    @ApiProperty({ type: CheckoutSessionDto })
    @ValidateNested()
    @Type(() => CheckoutSessionDto)
    order: CheckoutSessionDto;
}
