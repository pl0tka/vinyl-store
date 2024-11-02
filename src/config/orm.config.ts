import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import entities from '../database/entities/index.js';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities,
    migrations: ['dist/src/database/migrations/*.js'],
    synchronize: false,
};

export default registerAs('typeorm', () => config);
export const appDataSource = new DataSource(config);
