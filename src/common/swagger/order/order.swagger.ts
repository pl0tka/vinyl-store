import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SUMMARY } from '../constants/summary.js';
import { RESPONSE_DESC } from '../constants/response-desc.js';
import { STATUS_CODES } from '../constants/status-codes.js';
import { CreateOrderDto } from '../../../modules/order/dto/create-order.dto.js';
import { CreateOrderResponseDto } from '../../../modules/order/dto/create-order-response.dto.js';
import { applyDecorators } from '@nestjs/common';

export function SwaggerOrderCreate() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.ORDER.CREATE }),
        ApiBody({ type: CreateOrderDto }),
        ApiResponse({
            status: STATUS_CODES.CREATED,
            description: RESPONSE_DESC.ORDER.CREATE.OK,
            type: CreateOrderResponseDto,
        }),
        ApiResponse({
            status: STATUS_CODES.BAD_REQUEST,
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiResponse({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        }),
        ApiResponse({
            status: STATUS_CODES.UNAUTHORIZED,
            description: RESPONSE_DESC.COMMON.UNAUTHORIZED,
        }),
        ApiResponse({
            status: STATUS_CODES.FORBIDDEN,
            description: RESPONSE_DESC.COMMON.FORBIDDEN,
        })
    );
}
