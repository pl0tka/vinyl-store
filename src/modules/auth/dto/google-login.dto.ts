import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator';
import { MAX_URL_LENGTH } from '../../../common/constants/constants.js';
import { EmailValidation } from '../../../common/validations/email.validation.js';
import {
    FirstNameValidation,
    LastNameValidation,
} from '../../../common/validations/name.validation.js';

export class GoogleLoginDto {
    @IsNumber()
    @IsPositive()
    id: string;

    @EmailValidation()
    email: string;

    @FirstNameValidation()
    firstName: string;

    @LastNameValidation()
    lastName: string;

    @IsOptional()
    @IsString()
    @MaxLength(MAX_URL_LENGTH)
    avatar: string;

    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;
}
