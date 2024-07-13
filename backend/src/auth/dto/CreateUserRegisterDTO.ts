import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserRegisterDTO {
    readonly id: number
    
    @IsNotEmpty({message: "Full Name is Required"})
    @IsString({message: "Full Name needs to be string"})
    fullName: string

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "Password Required"})
    @MinLength(6, {message: "Password need to be at least 6 characters long"})
    password: string
}