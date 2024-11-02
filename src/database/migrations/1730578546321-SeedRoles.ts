import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1730578546321 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (id, name)
            VALUES (1, 'user'), (2, 'admin')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM roles
            WHERE name IN ('admin', 'user')
        `);
    }
}
