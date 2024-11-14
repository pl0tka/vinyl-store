import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoggerService } from './logger.service.js';
import { Role } from '../guards/roles.enum.js';
import { Roles } from '../guards/roles.decorator.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerLogsGetAll } from '../common/swagger/logger/logger.swagger.js';
import { API_TAGS } from '../common/swagger/constants/api-tags.js';

@ApiTags(API_TAGS.LOGS)
@Controller('logs')
export class LoggerController {
    constructor(private readonly _loggerService: LoggerService) {}

    @SwaggerLogsGetAll()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async getAll() {
        return this._loggerService.findAll();
    }
}
