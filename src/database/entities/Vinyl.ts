import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Review } from './index.js';

@Entity({ name: 'vinyls' })
export class Vinyl {
    @PrimaryColumn()
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 100 })
    author: string;

    @Column({ length: 2000 })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    coverImage: string;

    @OneToMany(() => Review, (review) => review.vinyl)
    reviews: Review[];
}
