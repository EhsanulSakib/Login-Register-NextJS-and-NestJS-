import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register(jwtConfig)
    ],
    providers:[AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
