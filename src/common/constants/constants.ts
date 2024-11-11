// server config
export const DEFAULT_HOST = '127.0.0.1';
export const DEFAULT_PORT = 3000;

// database config
export const DB_DEFAULT_HOST = '127.0.0.1';
export const DB_DEFAULT_PORT = 3306;

// error messages
export const ERROR_MESSAGES = {
    USER_EMAIL_EXISTS: 'User with this email already exists',
    USER_CREATION_FAILED: 'Could not create user',
    USER_NOT_FOUND: 'User not found',
    USER_WRONG_LOGIN_METHOD:
        'A user with this email already exists but is registered with a different login method',
    UNAUTHORIZED: 'Invalid credentials',
    NO_TOKEN_PROVIDED: 'No token provided',
    INVALID_TOKEN: 'Invalid token provided',
    ROLE_NOT_FOUND: 'Role not found',
    VINYL_NOT_FOUND: 'Vinyl not found',
    REVIEW_NOT_FOUND: 'Review not found',
    FORBIDDEN: 'No permission to access this resourse',
    EMAIL_SENT: 'Email sent successfully',
    EMAIL_SENDING_FAILED: 'Email sending failed',
};

// hash password
export const SALT_ROUNDS = 10;

// validation errors
export const VALIDATION_ERRORS = {
    FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
    FIELD_MIN_LENGTH: (fieldName: string, minLength: number) =>
        `${fieldName} must be min ${minLength} characters long`,
    FIELD_MAX_LENGTH: (fieldName: string, maxLength: number) =>
        `${fieldName} can be max ${maxLength} characters long`,
    FIELD_INVALID_FORMAT: (fieldName: string) =>
        `${fieldName} must be a string`,
    EMAIL_INVALID_FORMAT: 'Email must be a valid email address',
    PRICE_INVALID_FORMAT: 'Price must be a number with up to 2 decimal places',
};

export const MIN_NAME_LENGTH = 1;
export const MAX_NAME_LENGTH = 20;
export const MAX_VINYL_LENGTH = 50;
export const MAX_AUTHOR_LENGTH = 100;
export const MAX_VINYL_DESC_LENGTH = 2000;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 16;
export const MAX_URL_LENGTH = 2048;
export const MIN_PRICE_NUMBER = 0.01;
export const MAX_PRICE_NUMBER = 999.99;
export const PRICE_DECIMAL_PLACES = 2;
export const MIN_VINYL_COUNT = 1;
export const MIN_REVIEW_SCORE = 1;
export const MAX_REVIEW_SCORE = 5;
export const MAX_REVIEW_LENGTH = 2000;
