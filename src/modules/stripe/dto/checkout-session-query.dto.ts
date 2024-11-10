import { IsIn, IsString } from 'class-validator';
import { PaymentStatus } from '../constants/constants.js';

export class CheckoutSessionQueryDto {
    @IsString()
    session_id: string;

    @IsIn([PaymentStatus.SUCCESS, PaymentStatus.FAILED])
    status: PaymentStatus;
}
