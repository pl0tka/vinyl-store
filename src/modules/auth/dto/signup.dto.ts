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

export class SignupDto {
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
        minLength: MIN_NAME_LENGTH,
        maxLength: MAX_NAME_LENGTH,
    })
    @FirstNameValidation()
    firstName: string;

    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe',
        minLength: MIN_NAME_LENGTH,
        maxLength: MAX_NAME_LENGTH,
    })
    @LastNameValidation()
    lastName: string;

    @ApiProperty({
        description: 'Email of the user',
        example: 'john.doe@example.com',
    })
    @EmailValidation()
    email: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'Password@123',
        minLength: PASSWORD_MIN_LENGTH,
        maxLength: PASSWORD_MAX_LENGTH,
    })
    @PasswordValidation()
    password: string;

    @DateTransform()
    @IsOptional()
    @IsDate()
    birthday: Date | null;

    @IsOptional()
    @IsString()
    avatar: string | null;
}
