import { IsEmail, IsNotEmpty } from 'class-validator';
import { VALIDATION_ERRORS } from '../constants/constants.js';
import { applyDecorators } from '@nestjs/common';

export function EmailValidation() {
    return applyDecorators(
        IsEmail(
            {},
            { message: VALIDATION_ERRORS.FIELD_INVALID_FORMAT('Email') }
        ),
        IsNotEmpty({ message: VALIDATION_ERRORS.EMAIL_INVALID_FORMAT })
    );
}
