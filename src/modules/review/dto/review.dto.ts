import {
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    Min,
    Max,
    ValidateNested,
    IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../../modules/user/dto/user.dto.js';
import { VinylDto } from '../../../modules/vinyl/dto/vinyl.dto.js';
import { ApiProperty } from '@nestjs/swagger';
import {
    MAX_REVIEW_SCORE,
    MIN_REVIEW_SCORE,
} from '../../../common/constants/constants.js';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class ReviewDto {
    @ApiProperty({
        example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER,
        type: Number,
    })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    id: number;

    @ApiProperty({
        example: DTO_CONSTANTS.REVIEW_SCORE_EXAMPLE,
    })
    @ApiProperty({})
    @IsInt()
    @Min(MIN_REVIEW_SCORE)
    @Max(MAX_REVIEW_SCORE)
    @IsNotEmpty()
    score: number;

    @ApiProperty({ example: DTO_CONSTANTS.REVIEW_COMMENT_EXAMPLE })
    @IsString()
    @IsOptional()
    comment: string;

    @ApiProperty({ example: [] })
    @ValidateNested()
    @Type(() => VinylDto)
    vinyl: VinylDto;

    @ApiProperty({ example: {} })
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto;
}
