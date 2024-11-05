import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches,
} from 'class-validator';

export class SignupDto {
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
        minLength: 2,
        maxLength: 20,
    })
    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'First name must be a string' })
    @MinLength(2, { message: 'First name must be min 2 characters long' })
    @MaxLength(20, { message: 'First name can be max 20 characters long' })
    firstName: string;

    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe',
        minLength: 2,
        maxLength: 20,
    })
    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'Last name must be a string' })
    @MinLength(2, { message: 'Last name must be min 2 characters long' })
    @MaxLength(20, { message: 'Last name can be max 20 characters long' })
    lastName: string;

    @ApiProperty({
        description: 'Email of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'Password@123',
        minLength: 8,
        maxLength: 16,
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be min 8 characters long' })
    @MaxLength(16, { message: 'Password can be max 16 characters long' })
    @Matches(/(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
    })
    @Matches(/(?=.*[a-z])/, {
        message: 'Password must contain at least one lowercase letter',
    })
    @Matches(/(?=.*[0-9])/, {
        message: 'Password must contain at least one number',
    })
    @Matches(/(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least one special character',
    })
    password: string;

    birthday: Date;

    avatar: string;
}
