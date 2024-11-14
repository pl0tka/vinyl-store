import {
    IsInt,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';
import {
    MIN_REVIEW_SCORE,
    MAX_REVIEW_SCORE,
    MAX_REVIEW_LENGTH,
} from '../../../common/constants/constants.js';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({ example: DTO_CONSTANTS.REVIEW_SCORE_EXAMPLE })
    @IsInt()
    @Min(MIN_REVIEW_SCORE)
    @Max(MAX_REVIEW_SCORE)
    score: number;

    @ApiProperty({
        example: DTO_CONSTANTS.REVIEW_COMMENT_EXAMPLE,
        required: false,
    })
    @IsOptional()
    @MaxLength(MAX_REVIEW_LENGTH)
    @IsString()
    comment?: string;
}
