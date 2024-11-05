import { Injectable } from '@nestjs/common';

@Injectable()
export class VinylService {
    async getAllVinyls() {
        return [{ id: 1, name: 'creep' }];
    }
}
