import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { User, Vinyl } from './index.js';

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
}
