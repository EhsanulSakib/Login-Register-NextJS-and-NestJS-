import { JwtModule } from '@nestjs/jwt'
import * as dotenv from 'dotenv'
dotenv.config()

export const jwtConfig ={
    global: true,
    secret: process.env.JWT_TOKEN,
    signOptions: { expiresIn: '1h' },
}