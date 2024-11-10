import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Order, Vinyl } from '../../database/entities/index.js';
import { OrderStatus } from 'src/database/entities/constants/order-status.enum.js';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private readonly _repository: Repository<Order>
    ) {}

    async findAll(): Promise<Order[]> {
        return await this._repository.find();
    }

    async create(
        userId: string,
        vinyls: Vinyl[],
        price: number
    ): Promise<Order> {
        const newOrder = this._repository.create({
            user: { id: userId },
            vinyls,
            price,
        });

        return await this._repository.save(newOrder);
    }

    async updateStatus(orderId: string, status: OrderStatus): Promise<void> {
        await this._repository.update(orderId, { status });
    }
}
