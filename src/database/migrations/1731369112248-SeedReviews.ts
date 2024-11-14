import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedReviews1731369112248 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO reviews (score, comment, vinylId, userId) VALUES
                (5, 'Great album!', 1, 1),
                (4, 'Nice sound but a bit repetitive.', 1, 2),
                (3, 'Its good, but not my favorite.', 2, 3),
                (4, 'Solid album, great tracks.', 2, 4),
                (5, 'One of the best records I own.', 3, 5),
                (5, 'Absolutely love it!', 3, 1),
                (2, 'Not what I expected, kind of boring.', 4, 2),
                (4, 'Good but lacks variety.', 4, 3),
                (3, 'Average at best.', 5, 4),
                (4, 'Enjoyable, but not groundbreaking.', 5, 5),
                (5, 'A masterpiece!', 6, 1),
                (4, 'Solid effort, worth listening.', 6, 2),
                (4, 'Great tracks but a bit long.', 7, 3),
                (5, 'Phenomenal album!', 7, 4),
                (3, 'Good, but not my style.', 8, 5),
                (2, 'Did not enjoy this one.', 8, 1),
                (4, 'Love the sound, a great listen.', 9, 2),
                (4, 'Pretty good, solid album.', 9, 3),
                (5, 'Perfect for my collection!', 10, 4),
                (3, 'Decent, but lacks energy.', 10, 5),
                (4, 'Good record overall.', 11, 1),
                (3, 'Nothing special.', 12, 2),
                (5, 'Amazing sound!', 13, 3),
                (4, 'Really enjoyed it.', 14, 4),
                (4, 'Nice album, will listen again.', 15, 5),
                (2, 'Not for me.', 16, 1),
                (5, 'Perfect in every way!', 17, 2),
                (3, 'Its okay, but not amazing.', 18, 3),
                (5, 'Incredible, my new favorite!', 19, 4),
                (4, 'Very good album, would recommend.', 20, 5);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM reviews WHERE id BETWEEN 1 AND 30;
        `);
    }
}
