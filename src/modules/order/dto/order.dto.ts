import { OrderStatus } from '../../../common/constants/order-status.enum.js';

export class OrderDto {
    id: number;
    orderDate: Date;
    price: number;
    status: OrderStatus;
}
