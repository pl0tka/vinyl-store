import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Req,
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
import { ReviewService } from '../review/review.service.js';
import { CreateReviewDto } from '../review/dto/create-review.dto.js';
import { Review } from '../../database/entities/Review.js';
import { GetReviewsQueryDto } from '../review/dto/get-reviews-query.dto.js';
import { GetVinylsWithScoreAndReviewDto } from './dto/get-vinyls-with-score-and-review.dto.js';
import { VinylDto } from './dto/vinyl.dto.js';

@Controller('vinyls')
export class VinylController {
    constructor(
        private readonly _vinylService: VinylService,
        private readonly _reviewService: ReviewService
    ) {}

    @Get()
    async getAll(@Query() query: GetVinylsQueryDto): Promise<VinylDto[]> {
        return await this._vinylService.findAll(query);
    }

    @Public()
    @Get('public')
    async getAllWithAvgScoreAndFirstReview(
        @Query() query: GetVinylsQueryDto
    ): Promise<GetVinylsWithScoreAndReviewDto[]> {
        return await this._vinylService.findAllWithAvgScoreAndFirstReview(
            query
        );
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

    @Get(':id/reviews')
    async getReviewsByVinylId(
        @Query() query: GetReviewsQueryDto,
        @Param('id') vinylId: string
    ): Promise<Review[]> {
        try {
            return await this._reviewService.findAllByVinylId(query, vinylId);
        } catch (err) {
            if (err instanceof BadRequestException) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

    @Post(':id/reviews')
    async createReview(
        @Param('id') vinylId: string,
        @Req() req,
        @Body() createReviewDto: CreateReviewDto
    ) {
        const userId: string = req.user.userId;

        try {
            await this._reviewService.create(vinylId, userId, createReviewDto);
        } catch (err) {
            if (err instanceof BadRequestException) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete('/reviews/:reviewId')
    async deleteReview(@Param('reviewId') reviewlId: string) {
        try {
            await this._reviewService.delete(reviewlId);
        } catch (err) {
            if (
                err instanceof BadRequestException ||
                err instanceof NotFoundException
            ) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }
}
