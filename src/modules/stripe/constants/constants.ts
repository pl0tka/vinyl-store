/* eslint-disable no-unused-vars */
export const STRIPE_ERRORS = {
    INVALID_REQUEST_ERROR: 'StripeInvalidRequestError',
};

export enum PaymentStatus {
    SUCCESS = 'success',
    FAILED = 'failed',
}

export const APP_API_VERSION = '2024-10-28.acacia';

export const PAYMENT_URL = {
    SUCCESS:
        '/stripe/payment-status?session_id={CHECKOUT_SESSION_ID}&status=success',
    FAILED: '/stripe/payment-status?session_id={CHECKOUT_SESSION_ID}&status=failed',
};
