import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';
import {
    MAX_NAME_LENGTH,
    MAX_URL_LENGTH,
    MIN_NAME_LENGTH,
} from '../../../common/constants/constants.js';
import { ApiProperty } from '@nestjs/swagger';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class UpdateUserDto {
    @ApiProperty({
        description: DTO_CONSTANTS.USER_FIRST_NAME,
        example: DTO_CONSTANTS.USER_FIRST_NAME_EXAMPLE,
        minLength: MIN_NAME_LENGTH,
        maxLength: MAX_NAME_LENGTH,
        required: false,
    })
    @IsOptional()
    @MaxLength(MAX_NAME_LENGTH)
    @IsString()
    firstName?: string;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_LAST_NAME,
        example: DTO_CONSTANTS.USER_LAST_NAME_EXAMPLE,
        minLength: MIN_NAME_LENGTH,
        maxLength: MAX_NAME_LENGTH,
        required: false,
    })
    @IsOptional()
    @MaxLength(MAX_NAME_LENGTH)
    @IsString()
    lastName?: string;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_BIRTHDAY,
        example: DTO_CONSTANTS.USER_BIRTHDAY_EXAMPLE,
        required: false,
    })
    @IsOptional()
    @IsDate()
    birthday?: Date;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_AVATAR,
        example: DTO_CONSTANTS.USER_AVATAR_EXAMPLE,
        required: false,
    })
    @ApiProperty({})
    @IsOptional()
    @MaxLength(MAX_URL_LENGTH)
    @IsString()
    avatar?: string;
}
