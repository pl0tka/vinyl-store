import { ApiProperty } from '@nestjs/swagger';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class VinylsWithScoreAndReviewDto {
    @ApiProperty({
        example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER,
    })
    id: number;

    @ApiProperty({
        description: DTO_CONSTANTS.VINYL_NAME,
        example: DTO_CONSTANTS.VINYL_NAME_EXAMPLE,
    })
    name: string;

    @ApiProperty({
        description: DTO_CONSTANTS.VINYL_AUTHOR,
        example: DTO_CONSTANTS.VINYL_AUTHOR_EXAMPLE,
    })
    author: string;

    @ApiProperty({
        description: DTO_CONSTANTS.VINYL_DESCRIPTION,
        example: DTO_CONSTANTS.VINYL_DESCRIPTION_EXAMPLE,
    })
    description: string;

    @ApiProperty({
        description: DTO_CONSTANTS.VINYL_PRICE,
        example: DTO_CONSTANTS.PRICE_EXAMPLE,
    })
    price: number;

    @ApiProperty({
        description: DTO_CONSTANTS.VINYL_COVER_IMAGE,
        example: DTO_CONSTANTS.VINYL_COVER_IMAGE_EXAMPLE,
    })
    coverImage: string;

    @ApiProperty({
        description: DTO_CONSTANTS.VINYL_AVG_SCORE,
        example: DTO_CONSTANTS.VINYL_AVG_SCORE_EXAMPLE,
    })
    averageScore: number;

    @ApiProperty({
        description: DTO_CONSTANTS.VINYL_FIRST_REVIEW_COMMENT,
        example: DTO_CONSTANTS.VINYL_FIRST_REVIEW_COMMENT_EXAMPLE,
    })
    firstReviewComment: string;
}
