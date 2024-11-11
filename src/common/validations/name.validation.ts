import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    VALIDATION_ERRORS,
} from '../constants/constants.js';
import { applyDecorators } from '@nestjs/common';

export function FirstNameValidation() {
    return applyDecorators(
        IsNotEmpty({ message: VALIDATION_ERRORS.FIELD_REQUIRED('First name') }),
        IsString({
            message: VALIDATION_ERRORS.FIELD_INVALID_FORMAT('First name'),
        }),
        MinLength(MIN_NAME_LENGTH, {
            message: VALIDATION_ERRORS.FIELD_MIN_LENGTH(
                'First name',
                MIN_NAME_LENGTH
            ),
        }),
        MaxLength(MAX_NAME_LENGTH, {
            message: VALIDATION_ERRORS.FIELD_MAX_LENGTH(
                'First name',
                MAX_NAME_LENGTH
            ),
        })
    );
}

export function LastNameValidation() {
    return applyDecorators(
        IsNotEmpty({ message: VALIDATION_ERRORS.FIELD_REQUIRED('Last name') }),
        IsString({
            message: VALIDATION_ERRORS.FIELD_INVALID_FORMAT('Last name'),
        }),
        MinLength(MIN_NAME_LENGTH, {
            message: VALIDATION_ERRORS.FIELD_MIN_LENGTH(
                'Last name',
                MIN_NAME_LENGTH
            ),
        }),
        MaxLength(MAX_NAME_LENGTH, {
            message: VALIDATION_ERRORS.FIELD_MAX_LENGTH(
                'Last name',
                MAX_NAME_LENGTH
            ),
        })
    );
}
