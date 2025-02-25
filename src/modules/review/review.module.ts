import { Module } from '@nestjs/common';
import { ReviewService } from './review.service.js';
import { ReviewRepository } from './review.repository.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../database/entities/Review.js';
import { LoggerModule } from '../../logger/logger.module.js';
import { ReviewQueryService } from './review-query.service.js';
import { ReviewController } from './review.controller.js';

@Module({
    imports: [LoggerModule, TypeOrmModule.forFeature([Review])],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewRepository, ReviewQueryService],
    exports: [ReviewService],
})
export class ReviewModule {}
