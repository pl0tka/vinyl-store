import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderService } from '../modules/order/order.service.js';
import { OrderStatus } from '../common/constants/order-status.enum.js';
import { EVENTS } from '../events/constants/events.js';
import { emailInfo } from '../modules/mailer/constants/emailInfo.js';
import { MailerService } from '../modules/mailer/mailer.service.js';
import { PaymentFailedEvent } from 'src/events/payment-failed.event.js';

@Injectable()
export class PaymentFailedListener {
    constructor(
        private readonly _orderService: OrderService,
        private readonly _mailerService: MailerService
    ) {}

    @OnEvent(EVENTS.PAYMENT_FAILED)
    handlePaymentSuccessEvent(event: PaymentFailedEvent) {
        const { orderId, userEmail } = event;
        const { subject, text } = emailInfo.paymentFailed;

        this._orderService.updateStatus(orderId, OrderStatus.FAILED);
        this._mailerService.sendEmail(userEmail, subject, text);
    }
}
