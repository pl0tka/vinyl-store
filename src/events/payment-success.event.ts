/* eslint-disable no-unused-vars */
export class PaymentSuccessEvent {
    constructor(
        public orderId: string,
        public userEmail: string
    ) {}
}
