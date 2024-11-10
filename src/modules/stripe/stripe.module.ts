import { forwardRef, Module } from '@nestjs/common';
import { StripeController } from './stripe.controller.js';
import { StripeService } from './stripe.service.js';
import { PaymentSuccessListener } from '../../listeners/payment-success.listener.js';
import { OrderModule } from '../order/order.module.js';
import { MailerModule } from '../mailer/mailer.module.js';

@Module({
    imports: [forwardRef(() => OrderModule), MailerModule],
    providers: [StripeService, PaymentSuccessListener],
    controllers: [StripeController],
    exports: [StripeService],
})
export class StripeModule {}
