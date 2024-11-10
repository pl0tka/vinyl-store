import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Role, Review, Order, ChangeLog } from './index.js';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn()
    id: string;

    @Column({ length: 20 })
    firstName: string;

    @Column({ length: 20 })
    lastName: string;

    @Column({ length: 500, unique: true })
    email: string;

    @Column({ length: 500, nullable: true })
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

    @OneToMany(() => ChangeLog, (changeLog) => changeLog.user)
    changeLogs: ChangeLog[];
}
