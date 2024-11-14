import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { CreateOrderResponseDto } from './dto/create-order-response.dto.js';
import { StripeService } from '../stripe/stripe.service.js';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../../common/swagger/constants/api-tags.js';
import { SwaggerOrderCreate } from '../../common/swagger/order/order.swagger.js';

@ApiTags(API_TAGS.ORDERS)
@Controller('orders')
export class OrderController {
    constructor(
        private readonly _orderService: OrderService,
        private readonly _stripeService: StripeService
    ) {}

    @SwaggerOrderCreate()
    @Post()
    async create(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req
    ): Promise<CreateOrderResponseDto> {
        const userId = req.user.userId;

        const createdOrder: CreateOrderResponseDto =
            await this._orderService.create(userId, createOrderDto);

        return createdOrder;
    }
}
