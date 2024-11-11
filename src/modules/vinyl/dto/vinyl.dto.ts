import { ReviewDto } from 'src/modules/review/dto/review.dto.js';
import { OrderDto } from '../../../modules/order/dto/order.dto.js';

export class VinylDto {
    id: number;
    name: string;
    author: string;
    description: string;
    price: number;
    coverImage: string;
    reviews: ReviewDto[];
    orders: OrderDto[];
}
