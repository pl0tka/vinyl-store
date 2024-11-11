import {
    Entity,
    Column,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
} from 'typeorm';
import { User } from './index.js';

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable()
    users: User[];
}
