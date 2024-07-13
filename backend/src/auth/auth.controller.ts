import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRegisterDTO } from './dto/CreateUserRegisterDTO';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() createUserRegisterDTO:CreateUserRegisterDTO): Promise<User> {return this.authService.register(createUserRegisterDTO)}
}
