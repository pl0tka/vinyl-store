import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { User, Vinyl } from './index.js';
import { OrderStatus } from '../../common/constants/order-status.enum.js';

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToMany(() => Vinyl, (vinyl) => vinyl.orders)
    @JoinTable()
    vinyls: Vinyl[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;
}
