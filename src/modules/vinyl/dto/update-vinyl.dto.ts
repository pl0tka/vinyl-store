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
import { ApiProperty } from '@nestjs/swagger';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class UpdateVinylDto {
    @ApiProperty({ example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER, required: false })
    @IsOptional()
    @MaxLength(MAX_VINYL_LENGTH)
    @IsString()
    name?: string;

    @ApiProperty({
        example: DTO_CONSTANTS.VINYL_AUTHOR_EXAMPLE,
        required: false,
    })
    @IsOptional()
    @MaxLength(MAX_AUTHOR_LENGTH)
    @IsString()
    author?: string;

    @ApiProperty({
        example: DTO_CONSTANTS.VINYL_DESCRIPTION_EXAMPLE,
        required: false,
    })
    @IsOptional()
    @MaxLength(MAX_VINYL_DESC_LENGTH)
    @IsString()
    description?: string;

    @ApiProperty({
        example: DTO_CONSTANTS.PRICE_EXAMPLE,
        required: false,
    })
    @IsOptional()
    @Min(MIN_PRICE_NUMBER)
    @Max(MAX_PRICE_NUMBER)
    @IsNumber(
        { maxDecimalPlaces: PRICE_DECIMAL_PLACES },
        { message: VALIDATION_ERRORS.PRICE_INVALID_FORMAT }
    )
    price?: number;

    @ApiProperty({
        example: DTO_CONSTANTS.VINYL_COVER_IMAGE_EXAMPLE,
        required: false,
    })
    @IsOptional()
    @MaxLength(MAX_URL_LENGTH)
    coverImage?: string;
}
