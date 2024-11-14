import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service.js';
import { Roles } from '../../guards/roles.decorator.js';
import { Role } from '../../guards/roles.enum.js';
import { RolesGuard } from '../../guards/roles.guard.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { GetReviewsQueryDto } from './dto/get-reviews-query.dto.js';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../../common/swagger/constants/api-tags.js';
import {
    SwaggerReviewGetAllByVinylId,
    SwaggerReviewCreate,
    SwaggerReviewDelete,
} from '../../common/swagger/review/review.swagger.js';
import { ReviewDto } from './dto/review.dto.js';

@ApiTags(API_TAGS.REVIEWS)
@Controller('vinyls/:vinylId/reviews')
export class ReviewController {
    constructor(private readonly _reviewService: ReviewService) {}

    @SwaggerReviewGetAllByVinylId()
    @Get()
    async getAllByVinylId(
        @Query() query: GetReviewsQueryDto,
        @Param('vinylId') vinylId: string
    ): Promise<ReviewDto[]> {
        try {
            return await this._reviewService.findAllByVinylId(query, vinylId);
        } catch (err) {
            if (err instanceof BadRequestException) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

    @SwaggerReviewCreate()
    @Post()
    async create(
        @Param('vinylId') vinylId: string,
        @Req() req,
        @Body() createReviewDto: CreateReviewDto
    ): Promise<void> {
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

    @SwaggerReviewDelete()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(':reviewId')
    async delete(@Param('reviewId') reviewlId: string): Promise<void> {
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
