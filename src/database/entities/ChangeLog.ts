/* eslint-disable no-unused-vars */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './index.js';

export enum ActionType {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

@Entity({ name: 'change_logs' })
export class ChangeLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ActionType })
    actionType: ActionType;

    @Column()
    entity: string;

    @ManyToOne(() => User, (user) => user.changeLogs)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string;

    @Column({ type: 'json', nullable: true })
    oldData: Record<string, any>;

    @Column({ type: 'json' })
    newData: Record<string, any>;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    changeDate: Date;
}
