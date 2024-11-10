import { IsNumber, Min } from 'class-validator';

export class VinylOrderDto {
    @IsNumber()
    id: number;

    @Min(1)
    count: number;
}
