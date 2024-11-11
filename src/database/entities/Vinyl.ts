import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Review, Order } from './index.js';

@Entity({ name: 'vinyls' })
export class Vinyl {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    author: string;

    @Column({ type: 'varchar', length: 2000 })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    coverImage: string;

    @OneToMany(() => Review, (review) => review.vinyl)
    reviews: Review[];

    @ManyToMany(() => Order, (order) => order.vinyls)
    orders: Order[];
}
