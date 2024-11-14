import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { STATUS_CODES } from '../constants/status-codes.js';
import { SUMMARY } from '../constants/summary.js';
import { RESPONSE_DESC } from '../constants/response-desc.js';
import { ChangeLogDto } from '../../../logger/dto/change-log.dto.js';

export function SwaggerLogsGetAll() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.LOGS.GET }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.VINYL.GET_ALL.OK,
            type: ChangeLogDto,
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
            status: STATUS_CODES.FORBIDDEN,
            description: RESPONSE_DESC.COMMON.FORBIDDEN,
        })
    );
}
