import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from './logger.js';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
    constructor(private readonly _logger: WinstonLogger) {}

    use(req: Request, res: Response, next: NextFunction) {
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        this._logger.log(`Incoming request to: ${fullUrl}`);

        res.on('finish', () => {
            const message = `Request URL: ${fullUrl}, Method: ${req.method}, Status: ${res.statusCode}`;
            this._logger.log(message);
        });

        next();
    }
}
