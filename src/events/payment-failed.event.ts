/* eslint-disable no-unused-vars */
export class PaymentFailedEvent {
    constructor(
        public orderId: string,
        public userEmail: string
    ) {}
}
