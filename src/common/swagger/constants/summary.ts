export const SUMMARY = {
    AUTH: {
        SIGNUP: 'Sign up a new user',
        LOGIN: 'Login a user',
        GOOGLE_LOGIN: 'Signup/login using Google',
        GOOGLE_LOGIN_CALLBACK: 'Google OAuth callback',
        LOGOUT: 'Logout the user',
    },
    USER_PROFILE: {
        GET: 'Get user profile',
        UPDATE: 'Update user profile',
        DELETE: 'Delete user profile',
    },
    VINYL: {
        GET_ALL_PUBLIC:
            'Get all vinyls with an average score and first review comment, paginated. No authentication required',
        GET_ALL: 'Get all vinyls with query parameters',
        CREATE: 'Create a vinyl',
        UPDATE: 'Update a vinyl',
        DELETE: 'Delete a vinyl',
    },
    REVIEW: {
        GET_ALL_BY_VINYL_ID: 'Get all reviews for a vinyl',
        CREATE: 'Create a review',
        UPDATE: 'Update a review',
        DELETE: 'Delete a review',
    },
    ORDER: {
        CREATE: 'Create an order',
    },
    STRIPE: {
        CREATE_CHECKOUT_SESSION: 'Create a Stripe checkout session',
        GET_PAYMENT_STATUS: 'Get a Stripe payment status',
    },
    LOGS: {
        GET: 'Get all change logs',
    },
};
