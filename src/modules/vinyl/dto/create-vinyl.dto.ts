import {
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';
import {
    VALIDATION_ERRORS,
    MAX_URL_LENGTH,
    MIN_PRICE_NUMBER,
    MAX_PRICE_NUMBER,
    MAX_VINYL_LENGTH,
    MAX_AUTHOR_LENGTH,
    MAX_VINYL_DESC_LENGTH,
    PRICE_DECIMAL_PLACES,
} from '../../../common/constants/constants.js';

export class CreateVinylDto {
    @MaxLength(MAX_VINYL_LENGTH)
    @IsString()
    name: string;

    @MaxLength(MAX_AUTHOR_LENGTH)
    @IsString()
    author: string;

    @MaxLength(MAX_VINYL_DESC_LENGTH)
    @IsString()
    description: string;

    @Min(MIN_PRICE_NUMBER)
    @Max(MAX_PRICE_NUMBER)
    @IsNumber(
        { maxDecimalPlaces: PRICE_DECIMAL_PLACES },
        { message: VALIDATION_ERRORS.PRICE_INVALID_FORMAT }
    )
    price: number;

    @IsOptional()
    @MaxLength(MAX_URL_LENGTH)
    coverImage: string;
}
