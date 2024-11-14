import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import entities from '../database/entities/index.js';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
    type: 'mysql',
    host:
        process.env.NODE_ENV === 'local'
            ? process.env.DB_HOST
            : process.env.STACKHERO_MYSQL_HOST,
    port:
        process.env.NODE_ENV === 'local'
            ? Number(process.env.DB_PORT)
            : Number(process.env.STACKHERO_MYSQL_PORT),
    username: process.env.DB_USERNAME,
    password:
        process.env.NODE_ENV === 'local'
            ? process.env.DB_PASSWORD
            : process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
    database:
        process.env.NODE_ENV === 'local'
            ? process.env.DB_DATABASE_LOCAL
            : process.env.DB_DATABASE,
    entities,
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false,
    ssl: process.env.NODE_ENV === 'local' ? false : {},
};

export default registerAs('typeorm', () => config);
export const appDataSource = new DataSource(config);
