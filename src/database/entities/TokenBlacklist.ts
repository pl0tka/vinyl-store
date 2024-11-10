import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'token_blacklist' })
export class TokenBlacklist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;
}
