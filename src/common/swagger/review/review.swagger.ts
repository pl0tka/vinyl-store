import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiParam,
} from '@nestjs/swagger';
import { STATUS_CODES } from '../constants/status-codes.js';
import { SUMMARY } from '../constants/summary.js';
import { RESPONSE_DESC } from '../constants/response-desc.js';
import { CreateReviewDto } from '../../../modules/review/dto/create-review.dto.js';
import { GetReviewsQueryDto } from '../../../modules/review/dto/get-reviews-query.dto.js';
import { ReviewDto } from '../../../modules/review/dto/review.dto.js';
import { API_PARAMS } from '../constants/api-params.js';

export function SwaggerReviewGetAllByVinylId() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.REVIEW.GET_ALL_BY_VINYL_ID }),
        ApiQuery({ type: GetReviewsQueryDto, required: false }),
        ApiParam({
            name: API_PARAMS.VINYL_ID,
            description: API_PARAMS.VINYL_ID_DESC,
            required: true,
            example: API_PARAMS.ID_EXAMPLE,
        }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.REVIEW.GET_ALL_BY_VINYL_ID.OK,
            type: ReviewDto,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.REVIEW.CREATE.VINYL_NOT_FOUND,
        }),
        ApiResponse({
            status: STATUS_CODES.BAD_REQUEST,
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiResponse({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}

export function SwaggerReviewCreate() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.REVIEW.CREATE }),
        ApiBody({ type: CreateReviewDto }),
        ApiParam({
            name: API_PARAMS.VINYL_ID,
            description: API_PARAMS.VINYL_ID_DESC,
            required: true,
            example: API_PARAMS.ID_EXAMPLE,
        }),
        ApiResponse({
            status: STATUS_CODES.CREATED,
            description: RESPONSE_DESC.REVIEW.CREATE.OK,
        }),
        ApiResponse({
            status: STATUS_CODES.BAD_REQUEST,
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.REVIEW.CREATE.VINYL_NOT_FOUND,
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

export function SwaggerReviewDelete() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.REVIEW.DELETE }),
        ApiParam({
            name: API_PARAMS.VINYL_ID,
            description: API_PARAMS.VINYL_ID_DESC,
            required: true,
            example: API_PARAMS.ID_EXAMPLE,
        }),
        ApiParam({
            name: API_PARAMS.REVIEW_ID,
            description: API_PARAMS.REVIEW_ID_DESC,
            required: true,
            example: API_PARAMS.ID_EXAMPLE,
        }),
        ApiResponse({
            status: STATUS_CODES.NO_CONTENT,
            description: RESPONSE_DESC.REVIEW.DELETE.OK,
        }),
        ApiResponse({
            status: STATUS_CODES.FORBIDDEN,
            description: RESPONSE_DESC.COMMON.FORBIDDEN,
        }),
        ApiResponse({
            status: STATUS_CODES.UNAUTHORIZED,
            description: RESPONSE_DESC.COMMON.UNAUTHORIZED,
        }),
        ApiResponse({
            status: STATUS_CODES.BAD_REQUEST,
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.REVIEW.DELETE.NOT_FOUND,
        }),
        ApiResponse({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}
