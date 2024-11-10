import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import {
    STRIPE_ERRORS,
    PAYMENT_URL,
    APP_API_VERSION,
} from './constants/constants.js';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private _configService: ConfigService) {
        this.stripe = new Stripe(this._configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: APP_API_VERSION,
        });
    }

    async createCheckoutSession(orderId: number, amount: number) {
        const domainURL = this._configService.get('DOMAIN');

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'pln',
                        product_data: {
                            name: `Order #${orderId}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${domainURL}${PAYMENT_URL.SUCCESS}`,
            cancel_url: `${domainURL}${PAYMENT_URL.FAILED}`,

            expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
            metadata: {
                order_id: orderId.toString(),
            },
        });

        return session.url;
    }

    async getSession(sessionId: string) {
        try {
            const session =
                await this.stripe.checkout.sessions.retrieve(sessionId);
            return session;
        } catch (error) {
            if (error.type === STRIPE_ERRORS.INVALID_REQUEST_ERROR) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException(error.message);
        }
    }
}
