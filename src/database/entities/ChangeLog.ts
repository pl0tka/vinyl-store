/* eslint-disable no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

    @Column({ type: 'varchar' })
    entity: string;

    @Column({ type: 'varchar' })
    referenceId: string;

    @Column({ type: 'json', nullable: true })
    newData: Record<string, any>;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    changeDate: Date;
}
