import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User, Vinyl } from './index.js';

@Entity({ name: 'reviews' })
export class Review {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    score: number;

    @Column({ type: 'varchar', length: 5000, nullable: true })
    comment: string;

    @ManyToOne(() => Vinyl, (vinyl) => vinyl.reviews)
    vinyl: Vinyl;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;
}
