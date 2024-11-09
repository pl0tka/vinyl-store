import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @MaxLength(20)
    @IsString()
    firstName: string;

    @IsOptional()
    @MaxLength(20)
    @IsString()
    lastName: string;

    @IsOptional()
    @IsDate()
    birthday: Date;

    @IsOptional()
    @MaxLength(2048)
    @IsString()
    avatar: string;
}
