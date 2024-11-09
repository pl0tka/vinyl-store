import { Body, Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('profile')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get()
    async get(@Req() req) {
        const userId = req.user.userId;
        return await this._userService.findByIdWithReviewsAndOrders(userId);
    }

    @Patch()
    async update(@Req() req, @Body() body: UpdateUserDto) {
        const userId = req.user.userId;
        return await this._userService.update(userId, body);
    }

    @Delete()
    async delete(@Req() req) {
        const userId = req.user.userId;
        return await this._userService.delete(userId);
    }
}
