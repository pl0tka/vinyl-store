import { Controller, Get, Query } from '@nestjs/common';
import { VinylService } from './vinyl.service.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { VinylGetQueryDto } from './dto/get-query.dto.js';

@Controller('vinyls')
export class VinylController {
    constructor(private readonly _vinylService: VinylService) {}

    @Public()
    @Get()
    async getAll(@Query() query: VinylGetQueryDto) {
        return await this._vinylService.findAll(query);
    }
}
