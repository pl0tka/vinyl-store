import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1731367063785 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (id, firstName, lastName, email, password, birthday, avatar) VALUES
            ('1', 'John', 'Doe', 'john.doe@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1990-01-01', 'https://example.com/avatar1.jpg'),
            ('2', 'John', 'Smith', 'jane.smith@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1985-02-12', 'https://example.com/avatar2.jpg'),
            ('3', 'Alice', 'Johnson', 'alice.johnson@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1992-03-23', 'https://example.com/avatar3.jpg'),
            ('4', 'Bob', 'Brown', 'bob.brown@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1978-04-14', 'https://example.com/avatar4.jpg'),
            ('5', 'Charlie', 'Davis', 'charlie.davis@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1989-05-05', 'https://example.com/avatar5.jpg'),
            ('6', 'Eve', 'Wilson', 'eve.wilson@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1995-06-16', 'https://example.com/avatar6.jpg'),
            ('7', 'Frank', 'Taylor', 'frank.taylor@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1991-07-27', 'https://example.com/avatar7.jpg'),
            ('8', 'Grace', 'Anderson', 'grace.anderson@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1983-08-08', 'https://example.com/avatar8.jpg'),
            ('9', 'Hank', 'Anderson', 'hank.thomas@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1975-09-19', 'https://example.com/avatar9.jpg'),
            ('10', 'Ivy', 'Moore', 'ivy.moore@example.com', '$2a$10$1aOjPqASGhZ5FkFiD3XQZOFYqRylWmAIab/9hIgFX7BVNiBRKdHQK', '1999-10-10', 'https://example.com/avatar10.jpg');
    `);

        await queryRunner.query(`
            INSERT INTO roles_users_users (rolesId, usersId) VALUES
                (2, '1'),
                (1, '2'),
                (1, '3'),
                (1, '4'),
                (1, '5'),
                (1, '6'),
                (1, '7'),
                (1, '8'),
                (1, '9'),
                (1, '10');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM roles_users_users
        WHERE userId BETWEEN 1 AND 10
    `);

        await queryRunner.query(`
        DELETE FROM users
        WHERE id BETWEEN 1 AND 10
    `);
    }
}
