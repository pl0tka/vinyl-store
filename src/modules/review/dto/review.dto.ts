import { UserDto } from 'src/modules/user/dto/user.dto.js';
import { VinylDto } from '../../../modules/vinyl/dto/vinyl.dto.js';

export class ReviewDto {
    id: number;
    score: number;
    comment: string;
    vinyl: VinylDto;
    user: UserDto;
}
