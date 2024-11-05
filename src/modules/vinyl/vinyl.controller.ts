import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { VinylService } from './vinyl.service.js';

@Controller('vinyls')
export class VinylController {
    constructor(private readonly _vinylService: VinylService) {}

    @Get()
    async getAll() {
        try {
            const res = await this._vinylService.getAllVinyls();
            console.log(res);

            return res;
        } catch (err) {
            throw new HttpException(
                {
                    message: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
