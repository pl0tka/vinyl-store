import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { VinylService } from './vinyl.service.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { GetVinylsQueryDto } from './dto/get-vinyls-query.dto.js';
import { CreateVinylDto } from './dto/create-vinyl.dto.js';
import { UpdateVinylDto } from './dto/update-vinyl.dto.js';
import { Role } from '../../guards/roles.enum.js';
import { Roles } from '../../guards/roles.decorator.js';
import { RolesGuard } from '../../guards/roles.guard.js';

@Controller('vinyls')
export class VinylController {
    constructor(private readonly _vinylService: VinylService) {}

    @Public()
    @Get()
    async getAll(@Query() query: GetVinylsQueryDto) {
        return await this._vinylService.findAll(query);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateVinylDto) {
        return await this._vinylService.create(body);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: UpdateVinylDto) {
        return await this._vinylService.update(id, body);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        return await this._vinylService.delete(id);
    }
}
