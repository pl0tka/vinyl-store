import { Module } from '@nestjs/common';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, User, Vinyl } from '../../database/entities/index.js';
import { VinylModule } from '../vinyl/vinyl.module.js';
import { StripeModule } from '../stripe/stripe.module.js';
import { OrderRepository } from './order.repository.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Vinyl, Order]),
        VinylModule,
        StripeModule,
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [OrderService],
})
export class OrderModule {}
