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

export class CreateReviewDto {
    @IsInt()
    @Min(MIN_REVIEW_SCORE)
    @Max(MAX_REVIEW_SCORE)
    score: number;

    @IsOptional()
    @MaxLength(MAX_REVIEW_LENGTH)
    @IsString()
    comment?: string;
}
