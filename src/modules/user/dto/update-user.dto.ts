import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';
import {
    MAX_NAME_LENGTH,
    MAX_URL_LENGTH,
} from '../../../common/constants/constants.js';

export class UpdateUserDto {
    @IsOptional()
    @MaxLength(MAX_NAME_LENGTH)
    @IsString()
    firstName?: string;

    @IsOptional()
    @MaxLength(MAX_NAME_LENGTH)
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsDate()
    birthday?: Date;

    @IsOptional()
    @MaxLength(MAX_URL_LENGTH)
    @IsString()
    avatar?: string;
}
