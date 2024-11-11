import { Module } from '@nestjs/common';
import { VinylController } from './vinyl.controller.js';
import { VinylService } from './vinyl.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review, Vinyl } from '../../database/entities/index.js';
import { VinylRepository } from './vinyl.repository.js';
import { ReviewModule } from '../review/review.module.js';
import { LoggerModule } from '../../logger/logger.module.js';
import { VinylQueryService } from './vinyl-query.service.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vinyl, Review]),
        ReviewModule,
        LoggerModule,
    ],
    providers: [VinylService, VinylRepository, VinylQueryService],
    controllers: [VinylController],
    exports: [VinylService],
})
export class VinylModule {}
