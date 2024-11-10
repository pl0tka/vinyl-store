import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderService } from '../modules/order/order.service.js';
import { PaymentSuccessEvent } from '../events/payment-success.event.js';
import { OrderStatus } from '../database/entities/constants/order-status.enum.js';

@Injectable()
export class PaymentFailedListener {
    constructor(private readonly _orderService: OrderService) {}

    @OnEvent('payment.failed')
    handlePaymentSuccessEvent(event: PaymentSuccessEvent) {
        const { orderId } = event;

        this._orderService.updateStatus(orderId, OrderStatus.FAILED);
    }
}
