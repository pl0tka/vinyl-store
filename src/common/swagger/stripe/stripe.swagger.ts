import {
    ApiOperation,
    ApiBody,
    ApiResponse,
    ApiQuery,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateCheckoutSessionDto } from '../../../modules/stripe/dto/create-checkout-session.dto.js';
import { CheckoutSessionQueryDto } from '../../../modules/stripe/dto/checkout-session-query.dto.js';
import { STATUS_CODES } from '../constants/status-codes.js';
import { SUMMARY } from '../constants/summary.js';
import { RESPONSE_DESC } from '../constants/response-desc.js';
import { applyDecorators } from '@nestjs/common';

export function SwaggerStripeCreateCheckout() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.STRIPE.CREATE_CHECKOUT_SESSION }),
        ApiBody({ type: CreateCheckoutSessionDto }),
        ApiResponse({
            status: STATUS_CODES.CREATED,
            description: RESPONSE_DESC.STRIPE.CHECKOUT_SESSION.CREATED,
            type: String,
        }),
        ApiBadRequestResponse({
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiInternalServerErrorResponse({
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}

export function SwaggerStripePaymentStatus() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.STRIPE.GET_PAYMENT_STATUS }),
        ApiQuery({ type: CheckoutSessionQueryDto, required: true }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.STRIPE.PAYMENT_STATUS.OK,
        }),
        ApiBadRequestResponse({
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiInternalServerErrorResponse({
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}
