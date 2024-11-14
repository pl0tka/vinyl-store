import { ApiProperty } from '@nestjs/swagger';
import { EmailValidation } from '../../../common/validations/email.validation.js';
import { PasswordValidation } from '../../../common/validations/password.validation.js';
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from '../../../common/constants/constants.js';
import { DTO_CONSTANTS } from '../../../common/swagger/constants/dto.js';

export class LoginDto {
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
}
