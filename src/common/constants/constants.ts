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
    UNAUTHORIZED: 'Invalid credentials',
    ROLE_NOT_FOUND: 'Role not found',
};

// hash password
export const SALT_ROUNDS = 10;
