import { IsNumber, IsPositive } from "class-validator";

export class CheckoutSessionDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsNumber()
    @IsPositive()
    price: number;
}
