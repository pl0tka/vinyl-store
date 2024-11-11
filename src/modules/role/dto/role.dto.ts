import { UserDto } from 'src/modules/user/dto/user.dto.js';

export class RoleDto {
    id: number;
    name: string;
    users: UserDto[];
}
