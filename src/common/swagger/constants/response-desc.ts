export const RESPONSE_DESC = {
    COMMON: {
        BAD_REQUEST: 'Bad request',
        UNAUTHORIZED: 'Unauthorized',
        FORBIDDEN: 'Does not have permission to access this resource',
        INTERNAL_SERVER_ERROR: 'Internal server error',
    },
    AUTH: {
        SIGNUP: {
            CREATED: 'User successfully registered',
            CONFLICT: 'User with such email already exists',
        },
        LOGIN: {
            OK: 'User successfully logged in',
            UNAUTHORIZED: 'Invalid credentials',
            CONFLICT:
                'User with such email already exists but is registered with a different login method',
            NOT_FOUND: 'User with such email not found',
        },
        GOOGLE_LOGIN: {
            OK: 'Redirect to Google login',
        },
        GOOGLE_LOGIN_CALLBACK: {
            OK: 'User successfully logged in via Google',
            CONFLICT:
                'User with such email already exists but is registered with a different login method',
        },
        LOGOUT: {
            OK: 'User successfully logged out',
        },
    },
    USER: {
        GET: {
            OK: 'User profile retrieved successfully',
            NOT_FOUND: 'User profile not found',
        },
        UPDATE: {
            OK: 'User profile updated successfully',
            NOT_FOUND: 'User profile not found',
        },
        DELETE: {
            OK: 'User profile deleted successfully',
            NOT_FOUND: 'User profile not found',
        },
    },
    REVIEW: {
        GET_ALL_BY_VINYL_ID: {
            OK: 'Reviews retrieved successfully',
            VINYL_NOT_FOUND: 'Vinyl not found',
        },
        CREATE: {
            OK: 'Review created successfully',
            VINYL_NOT_FOUND: 'Vinyl not found',
        },
        DELETE: {
            OK: 'Review deleted successfully',
            NOT_FOUND: 'Review not found',
        },
    },
    VINYL: {
        GET_ALL: {
            OK: 'Vinyls retrieved successfully',
        },
        CREATE: {
            OK: 'Vinyl created successfully',
        },
        UPDATE: {
            OK: 'Vinyl updated successfully',
            NOT_FOUND: 'Vinyl not found',
        },
        DELETE: {
            OK: 'Vinyl deleted successfully',
            NOT_FOUND: 'Vinyl not found',
        },
    },
    ORDER: {
        CREATE: {
            OK: 'Order created successfully',
        },
    },
    STRIPE: {
        CHECKOUT_SESSION: {
            CREATED: 'Checkout session created successfully',
        },
        PAYMENT_STATUS: {
            OK: 'Payment status retrieved successfully',
            NOT_FOUND: 'Checkout session not found',
        },
    },
};
