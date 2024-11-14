import { Body, Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { API_TAGS } from '../../common/swagger/constants/api-tags.js';
import { ApiTags } from '@nestjs/swagger';
import {
    SwaggerUserDelete,
    SwaggerUserGet,
    SwaggerUserUpdate,
} from '../../common/swagger/user/user.swagger.js';
import { UserWithReviewsAndOrdersDto } from './dto/user-with-reviews-and-orders.dto.js';

@ApiTags(API_TAGS.USER)
@Controller('profile')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @SwaggerUserGet()
    @Get()
    async get(@Req() req): Promise<UserWithReviewsAndOrdersDto> {
        const userId = req.user.userId;
        return await this._userService.findByIdWithReviewsAndOrders(userId);
    }

    @SwaggerUserUpdate()
    @Patch()
    async update(@Req() req, @Body() body: UpdateUserDto): Promise<void> {
        const userId = req.user.userId;
        return await this._userService.update(userId, body);
    }

    @SwaggerUserDelete()
    @Delete()
    async delete(@Req() req): Promise<void> {
        const userId = req.user.userId;
        return await this._userService.delete(userId);
    }
}
