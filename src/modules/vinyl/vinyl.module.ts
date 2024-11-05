import { Module } from '@nestjs/common';
import { VinylController } from './vinyl.controller.js';
import { VinylService } from './vinyl.service.js';

@Module({
    providers: [VinylService],
    controllers: [VinylController],
})
export class VinylModule {}
