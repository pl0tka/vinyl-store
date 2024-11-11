import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderService } from '../modules/order/order.service.js';
import { PaymentSuccessEvent } from '../events/payment-success.event.js';
import { OrderStatus } from '../common/constants/order-status.enum.js';
import { MailerService } from '../modules/mailer/mailer.service.js';
import { EVENTS } from '../events/constants/events.js';
import { emailInfo } from '../modules/mailer/constants/emailInfo.js';

@Injectable()
export class PaymentSuccessListener {
    constructor(
        private readonly _orderService: OrderService,
        private readonly _mailerService: MailerService
    ) {}

    @OnEvent(EVENTS.PAYMENT_SUCCESS)
    handlePaymentSuccessEvent(event: PaymentSuccessEvent) {
        const { orderId, userEmail } = event;
        const { subject, text } = emailInfo.paymentSuccessful;

        this._orderService.updateStatus(orderId, OrderStatus.SUCCESS);
        this._mailerService.sendEmail(userEmail, subject, text);
    }
}
