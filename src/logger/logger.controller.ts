import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoggerService } from './logger.service.js';
import { Role } from '../guards/roles.enum.js';
import { Roles } from '../guards/roles.decorator.js';
import { RolesGuard } from '../guards/roles.guard.js';

@Controller('logs')
export class LoggerController {
    constructor(private readonly _loggerService: LoggerService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async getAll() {
        return this._loggerService.findAll();
    }
}
