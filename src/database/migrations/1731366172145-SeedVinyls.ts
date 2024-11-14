import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedVinyls1731366172145 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO vinyls (name, author, description, price, coverImage)
            VALUES
                ('Abbey Road', 'The Beatles', 'The eleventh studio album by the Beatles.', 29.99, 'https://example.com/cover1.jpg'),
                ('The Wall', 'Pink Floyd', 'A rock opera exploring isolation and mental health.', 35.50, 'https://example.com/cover2.jpg'),
                ('Back in Black', 'AC/DC', 'One of the best-selling albums of all time.', 25.00, 'https://example.com/cover3.jpg'),
                ('Rumours', 'Fleetwood Mac', 'An iconic album from the 70s.', 27.99, 'https://example.com/cover4.jpg'),
                ('Thriller', 'Michael Jackson', 'The best-selling album of all time.', 40.00, 'https://example.com/cover5.jpg'),
                ('Dark Side of the Moon', 'Pink Floyd', 'Concept album on mental health and society.', 34.00, 'https://example.com/cover6.jpg'),
                ('Hotel California', 'Eagles', 'An iconic 70s rock album.', 31.00, 'https://example.com/cover7.jpg'),
                ('Sgt. Peppers Lonely Hearts Club Band', 'The Beatles', 'A masterpiece in rock history.', 32.50, 'https://example.com/cover8.jpg'),
                ('Led Zeppelin IV', 'Led Zeppelin', 'Features the classic song Stairway to Heaven.', 29.50, 'https://example.com/cover9.jpg'),
                ('The Joshua Tree', 'U2', 'A defining album of the 80s.', 26.99, 'https://example.com/cover10.jpg'),
                ('Born in the U.S.A.', 'Bruce Springsteen', 'One of Springsteens best albums.', 28.99, 'https://example.com/cover11.jpg'),
                ('Nevermind', 'Nirvana', 'A groundbreaking album in grunge music.', 22.50, 'https://example.com/cover12.jpg'),
                ('Appetite for Destruction', 'Guns N Roses', 'A raw and powerful debut album.', 27.99, 'https://example.com/cover13.jpg'),
                ('Bad', 'Michael Jackson', 'One of the best-selling albums worldwide.', 35.00, 'https://example.com/cover14.jpg'),
                ('Parallel Lines', 'Blondie', 'A pop-punk classic.', 23.50, 'https://example.com/cover15.jpg'),
                ('Purple Rain', 'Prince', 'An album that shaped the 80s music scene.', 34.99, 'https://example.com/cover16.jpg'),
                ('Houses of the Holy', 'Led Zeppelin', 'An adventurous album with diverse sounds.', 29.99, 'https://example.com/cover17.jpg'),
                ('A Night at the Opera', 'Queen', 'Featuring the legendary track Bohemian Rhapsody.', 28.00, 'https://example.com/cover18.jpg'),
                ('The Eminem Show', 'Eminem', 'A defining album in hip-hop.', 24.99, 'https://example.com/cover19.jpg'),
                ('Off the Wall', 'Michael Jackson', 'The album that established Jackson as a pop icon.', 31.99, 'https://example.com/cover20.jpg'),
                ('Songs in the Key of Life', 'Stevie Wonder', 'A double album showcasing Wonders genius.', 36.00, 'https://example.com/cover21.jpg'),
                ('The Velvet Underground & Nico', 'The Velvet Underground', 'A revolutionary album in alternative music.', 33.50, 'https://example.com/cover22.jpg'),
                ('Exile on Main St.', 'The Rolling Stones', 'A quintessential rock and roll album.', 30.00, 'https://example.com/cover23.jpg'),
                ('Revolver', 'The Beatles', 'A masterpiece of 60s rock music.', 29.00, 'https://example.com/cover24.jpg'),
                ('Tapestry', 'Carole King', 'An influential album in singer-songwriter history.', 28.50, 'https://example.com/cover25.jpg'),
                ('Pet Sounds', 'The Beach Boys', 'A groundbreaking album in pop music.', 30.00, 'https://example.com/cover26.jpg'),
                ('OK Computer', 'Radiohead', 'A masterpiece of modern rock.', 27.50, 'https://example.com/cover27.jpg'),
                ('Blue', 'Joni Mitchell', 'One of the greatest singer-songwriter albums.', 26.99, 'https://example.com/cover28.jpg'),
                ('London Calling', 'The Clash', 'A genre-defying punk rock album.', 32.99, 'https://example.com/cover29.jpg'),
                ('In the Court of the Crimson King', 'King Crimson', 'A pioneering album in progressive rock.', 34.50, 'https://example.com/cover30.jpg'),
                ('Goodbye Yellow Brick Road', 'Elton John', 'A double album with some of Elton Johns best songs.', 31.50, 'https://example.com/cover31.jpg'),
                ('The Rise and Fall of Ziggy Stardust', 'David Bowie', 'A concept album with a lasting legacy.', 30.99, 'https://example.com/cover32.jpg'),
                ('Graceland', 'Paul Simon', 'A unique fusion of pop and world music.', 28.00, 'https://example.com/cover33.jpg'),
                ('Who is Next', 'The Who', 'An essential album in rock music.', 33.00, 'https://example.com/cover34.jpg'),
                ('Sticky Fingers', 'The Rolling Stones', 'An iconic Stones album.', 32.00, 'https://example.com/cover35.jpg'),
                ('Rumours', 'Fleetwood Mac', 'One of the best-selling albums ever.', 27.99, 'https://example.com/cover36.jpg'),
                ('Automatic for the People', 'R.E.M.', 'A reflective album with timeless songs.', 29.99, 'https://example.com/cover37.jpg'),
                ('Blonde on Blonde', 'Bob Dylan', 'A double album and a masterpiece of songwriting.', 30.00, 'https://example.com/cover38.jpg'),
                ('Harvest', 'Neil Young', 'A classic folk-rock album.', 28.50, 'https://example.com/cover39.jpg'),
                ('Superunknown', 'Soundgarden', 'A defining album of the grunge era.', 27.50, 'https://example.com/cover40.jpg'),
                ('Bridge Over Troubled Water', 'Simon & Garfunkel', 'A timeless album with a lasting impact.', 28.99, 'https://example.com/cover41.jpg'),
                ('The Doors', 'The Doors', 'A groundbreaking debut album.', 25.00, 'https://example.com/cover42.jpg'),
                ('Purple Rain', 'Prince', 'An album that defined the 80s.', 34.00, 'https://example.com/cover43.jpg'),
                ('Back to Black', 'Amy Winehouse', 'A modern classic album.', 32.50, 'https://example.com/cover44.jpg'),
                ('Doolittle', 'Pixies', 'An influential album in alternative rock.', 30.00, 'https://example.com/cover45.jpg'),
                ('Grace', 'Jeff Buckley', 'A hauntingly beautiful album.', 31.99, 'https://example.com/cover46.jpg'),
                ('Electric Ladyland', 'The Jimi Hendrix Experience', 'A psychedelic rock masterpiece.', 29.99, 'https://example.com/cover47.jpg'),
                ('IV', 'Led Zeppelin', 'Features the timeless track Stairway to Heaven.', 28.99, 'https://example.com/cover48.jpg'),
                ('The Miseducation of Lauryn Hill', 'Lauryn Hill', 'A defining album in neo-soul.', 27.50, 'https://example.com/cover49.jpg'),
                ('Is This It', 'The Strokes', 'A game-changing album in indie rock.', 26.99, 'https://example.com/cover50.jpg')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM vinyls
            WHERE id BETWEEN 1 AND 50
        `);
    }
}
