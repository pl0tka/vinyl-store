import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignupDto } from '../../../modules/auth/dto/signup.dto.js';
import { applyDecorators } from '@nestjs/common';
import { STATUS_CODES } from '../constants/status-codes.js';
import { RESPONSE_DESC } from '../constants/response-desc.js';
import { SUMMARY } from '../constants/summary.js';
import { LoginDto } from '../../../modules/auth/dto/login.dto.js';
import { LoginResponseDto } from '../../../modules/auth/dto/login-response.dto.js';

export function SwaggerAuthSingup() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.AUTH.SIGNUP }),
        ApiBody({ type: SignupDto }),
        ApiResponse({
            status: STATUS_CODES.CREATED,
            description: RESPONSE_DESC.AUTH.SIGNUP.CREATED,
        }),
        ApiResponse({
            status: STATUS_CODES.CONFLICT,
            description: RESPONSE_DESC.AUTH.SIGNUP.CONFLICT,
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

export function SwaggerAuthLogin() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.AUTH.LOGIN }),
        ApiBody({ type: LoginDto }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.AUTH.LOGIN.OK,
            type: LoginResponseDto,
        }),
        ApiResponse({
            status: STATUS_CODES.UNAUTHORIZED,
            description: RESPONSE_DESC.AUTH.LOGIN.UNAUTHORIZED,
        }),
        ApiResponse({
            status: STATUS_CODES.CONFLICT,
            description: RESPONSE_DESC.AUTH.LOGIN.CONFLICT,
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

export function SwaggerGoogleLogin() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.AUTH.GOOGLE_LOGIN }),
        ApiResponse({
            status: STATUS_CODES.FOUND,
            description: RESPONSE_DESC.AUTH.GOOGLE_LOGIN.OK,
        }),
        ApiResponse({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            description: RESPONSE_DESC.COMMON.INTERNAL_SERVER_ERROR,
        })
    );
}

export function SwaggerGoogleLoginCallback() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.AUTH.GOOGLE_LOGIN_CALLBACK }),
        ApiResponse({
            status: STATUS_CODES.OK,
            description: RESPONSE_DESC.AUTH.GOOGLE_LOGIN_CALLBACK.OK,
            type: LoginResponseDto,
        }),
        ApiResponse({
            status: STATUS_CODES.BAD_REQUEST,
            description: RESPONSE_DESC.COMMON.BAD_REQUEST,
        }),
        ApiResponse({
            status: STATUS_CODES.CONFLICT,
            description: RESPONSE_DESC.AUTH.GOOGLE_LOGIN_CALLBACK.CONFLICT,
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

export function SwaggerLogout() {
    return applyDecorators(
        ApiOperation({ summary: SUMMARY.AUTH.LOGOUT }),
        ApiResponse({
            status: STATUS_CODES.NO_CONTENT,
            description: RESPONSE_DESC.AUTH.LOGOUT.OK,
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
