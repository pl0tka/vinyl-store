import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1730576859633 implements MigrationInterface {
    name = 'CreateTables1730576859633';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`firstName\` varchar(20) NOT NULL, \`lastName\` varchar(20) NOT NULL, \`email\` varchar(500) NOT NULL, \`password\` varchar(500) NULL, \`birthday\` date NULL, \`avatar\` varchar(2048) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        console.log('created users table');
        await queryRunner.query(
            `CREATE TABLE \`vinyls\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(50) NOT NULL, \`author\` varchar(100) NOT NULL, \`description\` varchar(2000) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`coverImage\` varchar(2048) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        console.log('created roles table');
        await queryRunner.query(
            `CREATE TABLE \`reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`score\` int NOT NULL, \`comment\` varchar(5000) NULL, \`vinylId\` varchar(255) NULL, \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`roles_users_users\` (\`rolesId\` int NOT NULL, \`usersId\` varchar(255) NOT NULL, INDEX \`IDX_6baa1fce24dde516186c4f0269\` (\`rolesId\`), INDEX \`IDX_391282056f6da8665b38480a13\` (\`usersId\`), PRIMARY KEY (\`rolesId\`, \`usersId\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_824ac8e8ce880d78453bbdca9cb\` FOREIGN KEY (\`vinylId\`) REFERENCES \`vinyls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_7ed5659e7139fc8bc039198cc1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`roles_users_users\` ADD CONSTRAINT \`FK_6baa1fce24dde516186c4f0269a\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE \`roles_users_users\` ADD CONSTRAINT \`FK_391282056f6da8665b38480a131\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`roles_users_users\` DROP FOREIGN KEY \`FK_391282056f6da8665b38480a131\``
        );
        await queryRunner.query(
            `ALTER TABLE \`roles_users_users\` DROP FOREIGN KEY \`FK_6baa1fce24dde516186c4f0269a\``
        );
        await queryRunner.query(
            `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_7ed5659e7139fc8bc039198cc1f\``
        );
        await queryRunner.query(
            `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_824ac8e8ce880d78453bbdca9cb\``
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_391282056f6da8665b38480a13\` ON \`roles_users_users\``
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_6baa1fce24dde516186c4f0269\` ON \`roles_users_users\``
        );
        await queryRunner.query(`DROP TABLE \`roles_users_users\``);
        await queryRunner.query(`DROP TABLE \`reviews\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`vinyls\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
