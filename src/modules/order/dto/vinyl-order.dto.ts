import { IsNumber, Min } from 'class-validator';
import { MIN_VINYL_COUNT } from '../../../common/constants/constants.js';

export class VinylOrderDto {
    @IsNumber()
    id: number;

    @Min(MIN_VINYL_COUNT)
    count: number;
}
