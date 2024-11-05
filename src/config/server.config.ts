import { DEFAULT_HOST, DEFAULT_PORT } from '../common/constants/constants.js';

export default () => ({
    host: String(process.env.HOST) || DEFAULT_HOST,
    port: Number(process.env.PORT) || DEFAULT_PORT,
});
