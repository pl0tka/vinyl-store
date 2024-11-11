import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Role, Review, Order } from './index.js';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id: string;

    @Column({ type: 'varchar', length: 20 })
    firstName: string;

    @Column({ type: 'varchar', length: 20 })
    lastName: string;

    @Column({ type: 'varchar', length: 500, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    password: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    avatar: string;

    @ManyToMany(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
    roles: Role[];

    @OneToMany(() => Review, (review) => review.user, { onDelete: 'CASCADE' })
    reviews: Review[];

    @OneToMany(() => Order, (order) => order.user, {
        onDelete: 'CASCADE',
    })
    orders: Order[];
}
