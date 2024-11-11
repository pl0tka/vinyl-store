import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { VinylService } from '../vinyl/vinyl.service.js';
import { Vinyl } from 'src/database/entities/index.js';
import { CreateOrderResponseDto } from './dto/create-order-response.dto.js';
import { OrderStatus } from '../../common/constants/order-status.enum.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { ENTITIES } from '../../database/entities/constants/entities.js';
import { ActionType } from '../../database/entities/ChangeLog.js';
import { LoggerService } from '../../logger/logger.service.js';

@Injectable()
export class OrderService {
    constructor(
        private readonly _orderRepository: OrderRepository,
        private readonly _vinylService: VinylService,
        private readonly _logger: LoggerService
    ) {
        this._logger.setContext(OrderService.name);
    }

    async create(
        userId: string,
        createOrderDto: CreateOrderDto
    ): Promise<CreateOrderResponseDto> {
        try {
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

            await this._logger.logToDB(
                ActionType.CREATE,
                ENTITIES.ORDER,
                createdOrder.id,
                createdOrder
            );

            return { id: createdOrder.id, price: formattedPrice };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new BadRequestException(error.message);
        }
    }

    async updateStatus(orderId: string, status: OrderStatus): Promise<void> {
        try {
            await this._orderRepository.updateStatus(orderId, status);

            await this._logger.logToDB(
                ActionType.UPDATE,
                ENTITIES.ORDER,
                orderId,
                { status }
            );
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
