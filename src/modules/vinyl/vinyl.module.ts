import { Module } from '@nestjs/common';
import { VinylController } from './vinyl.controller.js';
import { VinylService } from './vinyl.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review, Vinyl } from '../../database/entities/index.js';
import { VinylRepository } from './vinyl.repository.js';
import { ReviewModule } from '../review/review.module.js';

@Module({
    imports: [TypeOrmModule.forFeature([Vinyl, Review]), ReviewModule],
    providers: [VinylService, VinylRepository],
    controllers: [VinylController],
})
export class VinylModule {}
