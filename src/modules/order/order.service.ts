import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { VinylService } from '../vinyl/vinyl.service.js';
import { Vinyl } from 'src/database/entities/index.js';
import { CreateOrderResponseDto } from './dto/create-order-response.dto.js';
import { OrderStatus } from 'src/database/entities/constants/order-status.enum.js';
import { ERROR_MESSAGES } from 'src/common/constants/constants.js';

@Injectable()
export class OrderService {
    constructor(
        private readonly _orderRepository: OrderRepository,
        private readonly _vinylService: VinylService
    ) {}

    async create(
        userId: string,
        createOrderDto: CreateOrderDto
    ): Promise<CreateOrderResponseDto> {
        const { vinyls } = createOrderDto;

        let orderPrice = 0;

        for (const vinyl of vinyls) {
            const vinylFromDb = await this._vinylService.findById(vinyl.id);
            if (!vinylFromDb) {
                throw new NotFoundException(ERROR_MESSAGES.VINYL_NOT_FOUND);
            }
            orderPrice += vinylFromDb.price * vinyl.count;
        }

        const vinylsArray: Vinyl[] = vinyls.map(
            (item) => ({ id: item.id }) as Vinyl
        );

        const createdOrder = await this._orderRepository.create(
            userId,
            vinylsArray,
            orderPrice
        );
        const formattedPrice = createdOrder.price * 100;

        return { id: createdOrder.id, price: formattedPrice };
    }

    async updateStatus(orderId: string, status: OrderStatus): Promise<void> {
        await this._orderRepository.updateStatus(orderId, status);
    }
}
