import {
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class UpdateVinylDto {
    @IsOptional()
    @MaxLength(50)
    @IsString()
    name?: string;

    @IsOptional()
    @MaxLength(100)
    @IsString()
    author?: string;

    @IsOptional()
    @MaxLength(2000)
    @IsString()
    description?: string;

    @IsOptional()
    @Min(0.01)
    @Max(999.99)
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'Price must be a number with up to 2 decimal places' }
    )
    price?: number;

    @IsOptional()
    @MaxLength(2048)
    coverImage?: string;
}
