import Stripe from 'stripe';

/* eslint-disable no-unused-vars */
export const STRIPE_ERRORS = {
    INVALID_REQUEST_ERROR: 'StripeInvalidRequestError',
};

export enum PaymentStatus {
    SUCCESS = 'success',
    FAILED = 'failed',
}

export const APP_API_VERSION = '2024-10-28.acacia';

export const CreateSessionConfig = {
    payment_method_types: [
        'card',
    ] as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
    mode: 'payment' as Stripe.Checkout.SessionCreateParams.Mode,
    currency: 'pln',
    successURL:
        '/stripe/payment-status?session_id={CHECKOUT_SESSION_ID}&status=success',
    cancelURL:
        '/stripe/payment-status?session_id={CHECKOUT_SESSION_ID}&status=failed',
    quantity: 1,
    paymentTitle: 'Order #',
};
