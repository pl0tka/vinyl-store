import { Module } from '@nestjs/common';
import { VinylController } from './vinyl.controller.js';
import { VinylService } from './vinyl.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vinyl } from '../../database/entities/index.js';
import { VinylRepository } from './vinyl.repository.js';
import { VinylQueryService } from './vinyl-query.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([Vinyl])],
    providers: [VinylService, VinylRepository, VinylQueryService],
    controllers: [VinylController],
})
export class VinylModule {}
