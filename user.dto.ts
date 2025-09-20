import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    @Length(2, 50, {message: 'Name must be between 2 and 50 characters'})
    @IsString()
    name!: string;
    @IsNotEmpty()
    @IsEmail({}, {message: 'Email must be valid'})
    email!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @Length(2, 50, {message: 'Name must be between 2 and 50 characters'})
    @IsString()
    name?: string;
    @IsOptional()
    @IsEmail({}, {message: 'Email must be valid'})
    email?: string;
}

export class UserResponseDto {
    id!: string;
    name!: string;
    email?: string;
}