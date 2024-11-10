import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StripeService } from './stripe.service.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto.js';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentSuccessEvent } from '../../events/payment-success.event.js';
import { PaymentFailedEvent } from '../../events/payment-failed.event.js';
import { CheckoutSessionQueryDto } from './dto/checkout-session-query.dto.js';
import { PaymentStatus } from './constants/constants.js';
import { EVENTS } from '../../events/constants/events.js';

@Controller('stripe')
export class StripeController {
    constructor(
        private readonly _stripeService: StripeService,
        private _eventEmitter: EventEmitter2
    ) {}

    @Post('checkout')
    async create(
        @Body() createCheckoutSessionDto: CreateCheckoutSessionDto
    ): Promise<string> {
        const { id, price } = createCheckoutSessionDto.order;

        const sessionUrl = await this._stripeService.createCheckoutSession(
            id,
            price
        );
        return sessionUrl;
    }

    @Public()
    @Get('payment-status')
    async paymentSuccess(@Query() query: CheckoutSessionQueryDto) {
        const { session_id: sessionId, status } = query;
        const session = await this._stripeService.getSession(sessionId);
        const orderId = session.metadata.order_id;
        const userEmail = session.customer_email;

        if (status === PaymentStatus.SUCCESS) {
            this._eventEmitter.emit(
                EVENTS.PAYMENT_SUCCESS,
                new PaymentSuccessEvent(orderId, userEmail)
            );
        } else {
            this._eventEmitter.emit(
                EVENTS.PAYMENT_FAILED,
                new PaymentFailedEvent(orderId, userEmail)
            );
        }
    }
}
