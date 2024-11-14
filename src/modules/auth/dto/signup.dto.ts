import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';
import {
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from '../../../common/constants/constants.js';
import { PasswordValidation } from '../../../common/validations/password.validation.js';
import { EmailValidation } from '../../../common/validations/email.validation.js';
import {
    FirstNameValidation,
    LastNameValidation,
} from '../../../common/validations/name.validation.js';
import { DateTransform } from '../../../common/validations/date-transform.js';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class SignupDto {
    @ApiProperty({
        description: DTO_CONSTANTS.USER_FIRST_NAME,
        example: DTO_CONSTANTS.USER_FIRST_NAME_EXAMPLE,
        minLength: MIN_NAME_LENGTH,
        maxLength: MAX_NAME_LENGTH,
    })
    @FirstNameValidation()
    firstName: string;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_LAST_NAME,
        example: DTO_CONSTANTS.USER_LAST_NAME_EXAMPLE,
        minLength: MIN_NAME_LENGTH,
        maxLength: MAX_NAME_LENGTH,
    })
    @LastNameValidation()
    lastName: string;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_EMAIL,
        example: DTO_CONSTANTS.USER_EMAIL_EXAMPLE,
    })
    @EmailValidation()
    email: string;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_PASSWORD,
        example: DTO_CONSTANTS.USER_PASSWORD_EXAMPLE,
        minLength: PASSWORD_MIN_LENGTH,
        maxLength: PASSWORD_MAX_LENGTH,
    })
    @PasswordValidation()
    password: string;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_BIRTHDAY,
        example: DTO_CONSTANTS.USER_BIRTHDAY_EXAMPLE,
        required: false,
    })
    @DateTransform()
    @IsOptional()
    @IsDate()
    birthday: Date | null;

    @ApiProperty({
        description: DTO_CONSTANTS.USER_AVATAR,
        example: DTO_CONSTANTS.USER_AVATAR_EXAMPLE,
        required: false,
    })
    @IsOptional()
    @IsString()
    avatar: string | null;
}
