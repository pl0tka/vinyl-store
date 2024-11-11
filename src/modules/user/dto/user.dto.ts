import { RoleDto } from 'src/modules/role/dto/role.dto.js';
import { ReviewDto } from 'src/modules/review/dto/review.dto.js';
import { OrderDto } from 'src/modules/order/dto/order.dto.js';

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: Date;
    avatar: string;
    roles: RoleDto[];
    reviews: ReviewDto[];
    orders: OrderDto[];
}
