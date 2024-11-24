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
import { CreateVinylDto } from '../../../modules/vinyl/dto/create-vinyl.dto.js';
import { UpdateVinylDto } from '../../../modules/vinyl/dto/update-vinyl.dto.js';
import { VinylDto } from '../../../modules/vinyl/dto/vinyl.dto.js';
import { API_PARAMS } from '../constants/api-params.js';
import { GeneralQueryDto } from '../../../common/dto/query.dto.js';
import { VinylsWithScoreAndReviewDto } from '../../../modules/vinyl/dto/vinyls-with-score-and-review.dto.js';

export function SwaggerVinylGetAllPublic() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.VINYL.GET_ALL_PUBLIC }),
        ApiQuery({
            type: GeneralQueryDto,
            required: false,
        }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.VINYL.GET_ALL.OK,
            type: VinylsWithScoreAndReviewDto,
            isArray: true,
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

export function SwaggerVinylGetAll() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.VINYL.GET_ALL }),
        ApiQuery({
            type: GeneralQueryDto,
            required: false,
        }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.VINYL.GET_ALL.OK,
            type: VinylDto,
            isArray: true,
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
        })
    );
}

export function SwaggerVinylCreate() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.VINYL.CREATE }),
        ApiBody({ type: CreateVinylDto }),
        ApiResponse({
            status: STATUS_CODES.CREATED,
            description: RESPONSE_DESC.VINYL.CREATE.OK,
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

export function SwaggerVinylUpdate() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.VINYL.UPDATE }),
        ApiParam({
            name: API_PARAMS.VINYL_ID,
            description: API_PARAMS.VINYL_ID_DESC,
            required: true,
            example: API_PARAMS.ID_EXAMPLE,
        }),
        ApiBody({ type: UpdateVinylDto }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.VINYL.UPDATE.OK,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.VINYL.UPDATE.NOT_FOUND,
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

export function SwaggerVinylDelete() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.VINYL.DELETE }),
        ApiParam({
            name: API_PARAMS.VINYL_ID,
            description: API_PARAMS.VINYL_ID_DESC,
            required: true,
            example: API_PARAMS.ID_EXAMPLE,
        }),
        ApiResponse({
            status: STATUS_CODES.NO_CONTENT,
            description: RESPONSE_DESC.VINYL.DELETE.OK,
        }),
        ApiResponse({
            status: STATUS_CODES.NOT_FOUND,
            description: RESPONSE_DESC.VINYL.DELETE.NOT_FOUND,
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
