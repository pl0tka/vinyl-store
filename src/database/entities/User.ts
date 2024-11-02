import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Vinyl, Role, Review } from './index.js';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn()
    id: string;

    @Column({ length: 20 })
    firstName: string;

    @Column({ length: 20 })
    lastName: string;

    @Column({ length: 500 })
    email: string;

    @Column({ length: 500, nullable: true })
    password: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    avatar: string;

    @ManyToMany(() => Role, (role) => role.users)
    roles: Role[];

    @OneToMany(() => Vinyl, (vinyl) => vinyl.author)
    vinyls: Vinyl[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}
