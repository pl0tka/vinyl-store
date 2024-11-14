import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { STATUS_CODES } from '../constants/status-codes.js';
import { SUMMARY } from '../constants/summary.js';
import { RESPONSE_DESC } from '../constants/response-desc.js';
import { UserWithReviewsAndOrdersDto } from '../../../modules/user/dto/user-with-reviews-and-orders.dto.js';
import { UpdateUserDto } from '../../../modules/user/dto/update-user.dto.js';

export function SwaggerUserGet() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.USER_PROFILE.GET }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.USER.GET.OK,
            type: UserWithReviewsAndOrdersDto,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.USER.GET.NOT_FOUND,
        }),
        ApiResponse({
            status: STATUS_CODES.UNAUTHORIZED,
            description: RESPONSE_DESC.COMMON.UNAUTHORIZED,
        }),
        ApiResponse({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}

export function SwaggerUserUpdate() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.USER_PROFILE.UPDATE }),
        ApiBody({ type: UpdateUserDto }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.USER.UPDATE.OK,
        }),
        ApiResponse({
            status: STATUS_CODES.BAD_REQUEST,
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiResponse({
            status: STATUS_CODES.UNAUTHORIZED,
            description: RESPONSE_DESC.COMMON.UNAUTHORIZED,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.USER.GET.NOT_FOUND,
        }),
        ApiResponse({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}

export function SwaggerUserDelete() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.USER_PROFILE.DELETE }),
        ApiResponse({
            status: STATUS_CODES.NO_CONTENT,
            description: RESPONSE_DESC.USER.DELETE.OK,
        }),
        ApiResponse({
            status: STATUS_CODES.BAD_REQUEST,
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiResponse({
            status: STATUS_CODES.UNAUTHORIZED,
            description: RESPONSE_DESC.COMMON.UNAUTHORIZED,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.USER.GET.NOT_FOUND,
        }),
        ApiResponse({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}
