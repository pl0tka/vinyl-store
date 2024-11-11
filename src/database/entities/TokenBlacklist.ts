import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'token_blacklist' })
export class TokenBlacklist {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 500 })
    token: string;
}
