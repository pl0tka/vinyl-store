import { ApiProperty } from '@nestjs/swagger';
import { OrderDto } from '../../../modules/order/dto/order.dto.js';
import { ReviewDto } from '../../../modules/review/dto/review.dto.js';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class UserWithReviewsAndOrdersDto {
    @ApiProperty({
        example: DTO_CONSTANTS.ID_EXAMPLE_NUMBER,
    })
    id: string;

    @ApiProperty({
        example: DTO_CONSTANTS.USER_FIRST_NAME_EXAMPLE,
    })
    firstName: string;

    @ApiProperty({ example: DTO_CONSTANTS.USER_LAST_NAME_EXAMPLE })
    lastName: string;

    @ApiProperty({ example: DTO_CONSTANTS.USER_EMAIL_EXAMPLE })
    email: string;

    @ApiProperty({ example: DTO_CONSTANTS.USER_PASSWORD_EXAMPLE })
    password: string;

    @ApiProperty({ example: DTO_CONSTANTS.USER_BIRTHDAY_EXAMPLE })
    birthday: Date;

    @ApiProperty({ example: DTO_CONSTANTS.USER_AVATAR_EXAMPLE })
    avatar?: string | null;

    @ApiProperty({ example: [] })
    reviews: ReviewDto[];

    @ApiProperty({ example: [] })
    orders: OrderDto[];
}
