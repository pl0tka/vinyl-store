import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { STRIPE_ERRORS, APP_API_VERSION } from './constants/constants.js';
import { CreateSessionConfig } from './constants/constants.js';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private _configService: ConfigService) {
        this.stripe = new Stripe(this._configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: APP_API_VERSION,
        });
    }

    async createCheckoutSession(orderId: number, orderAmount: number) {
        const {
            payment_method_types,
            mode,
            currency,
            successURL,
            cancelURL,
            quantity,
            paymentTitle,
        } = CreateSessionConfig;
        const domainURL = this._configService.get<string>('DOMAIN');

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types,
            mode,
            line_items: [
                {
                    price_data: {
                        currency,
                        product_data: {
                            name: `${paymentTitle}${orderId}`,
                        },
                        unit_amount: orderAmount,
                    },
                    quantity,
                },
            ],
            success_url: `${domainURL}${successURL}`,
            cancel_url: `${domainURL}${cancelURL}`,

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
