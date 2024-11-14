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
import { VinylsWithScoreAndReviewDto } from './dto/vinyls-with-score-and-review.dto.js';
import { VinylDto } from './dto/vinyl.dto.js';
import { API_TAGS } from '../../common/swagger/constants/api-tags.js';
import { ApiTags } from '@nestjs/swagger';
import {
    SwaggerVinylGetAllPublic,
    SwaggerVinylGetAll,
    SwaggerVinylCreate,
    SwaggerVinylDelete,
    SwaggerVinylUpdate,
} from '../../common/swagger/vinyl/vinyl.swagger.js';

@ApiTags(API_TAGS.VINYLS)
@Controller('vinyls')
export class VinylController {
    constructor(private readonly _vinylService: VinylService) {}

    @SwaggerVinylGetAll()
    @Get()
    async getAll(@Query() query: GetVinylsQueryDto): Promise<VinylDto[]> {
        return await this._vinylService.findAll(query);
    }

    @SwaggerVinylGetAllPublic()
    @Public()
    @Get('public')
    async getAllWithAvgScoreAndFirstReview(
        @Query() query: GetVinylsQueryDto
    ): Promise<VinylsWithScoreAndReviewDto[]> {
        return await this._vinylService.findAllWithAvgScoreAndFirstReview(
            query
        );
    }

    @SwaggerVinylCreate()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateVinylDto): Promise<void> {
        return await this._vinylService.create(body);
    }

    @SwaggerVinylUpdate()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Patch(':vinylId')
    async update(
        @Param('vinylId') id: string,
        @Body() body: UpdateVinylDto
    ): Promise<void> {
        return await this._vinylService.update(id, body);
    }

    @SwaggerVinylDelete()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(':vinylId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('vinylId') id: string): Promise<void> {
        return await this._vinylService.delete(id);
    }
}
