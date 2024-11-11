import {
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { getPasswordRegexPatterns } from './regex-patterns.js';
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    VALIDATION_ERRORS,
} from '../constants/constants.js';
import { applyDecorators } from '@nestjs/common';

export function PasswordValidation() {
    return applyDecorators(
        IsNotEmpty({ message: VALIDATION_ERRORS.FIELD_REQUIRED('Password') }),
        IsString({
            message: VALIDATION_ERRORS.FIELD_INVALID_FORMAT('Password'),
        }),
        MinLength(PASSWORD_MIN_LENGTH, {
            message: VALIDATION_ERRORS.FIELD_MIN_LENGTH(
                'Password',
                PASSWORD_MIN_LENGTH
            ),
        }),
        MaxLength(PASSWORD_MAX_LENGTH, {
            message: VALIDATION_ERRORS.FIELD_MAX_LENGTH(
                'Password',
                PASSWORD_MAX_LENGTH
            ),
        }),
        Matches(getPasswordRegexPatterns().uppercasePattern, {
            message: 'Password must contain at least one uppercase letter',
        }),
        Matches(getPasswordRegexPatterns().lowercasePattern, {
            message: 'Password must contain at least one lowercase letter',
        }),
        Matches(getPasswordRegexPatterns().numberPattern, {
            message: 'Password must contain at least one number',
        }),
        Matches(getPasswordRegexPatterns().specialCharacterPattern, {
            message: 'Password must contain at least one special character',
        })
    );
}
