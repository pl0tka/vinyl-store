import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CheckoutSessionDto } from './checkout-session.dto.js';

export class CreateCheckoutSessionDto {
    @ValidateNested()
    @Type(() => CheckoutSessionDto)
    order: CheckoutSessionDto;
}
