import {
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateVinylDto {
    @MaxLength(50)
    @IsString()
    name: string;

    @MaxLength(100)
    @IsString()
    author: string;

    @MaxLength(2000)
    @IsString()
    description: string;

    @Min(0.01)
    @Max(999.99)
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'Price must be a number with up to 2 decimal places' }
    )
    price: number;

    @IsOptional()
    @MaxLength(2048)
    coverImage: string;
}
