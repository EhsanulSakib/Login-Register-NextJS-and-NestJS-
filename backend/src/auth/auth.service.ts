import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRegisterDTO } from './dto/CreateUserRegisterDTO';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    async register(createUserRegisterDTO: CreateUserRegisterDTO){
        try{
            const {email, password, ...restUser} = createUserRegisterDTO

            const isExist = await this.userRepository.findOneBy({email: email})

            if(isExist){
                throw new BadRequestException('User already registered')
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = this.userRepository.create({
                email,
                password: hashedPassword,
                ...restUser
            })

            const savedUser = await this.userRepository.save(user)

            const payload = {
                email,
                id: savedUser?.id,
                fullName: savedUser?.fullName
            }

            const token = await this.jwtService.signAsync(payload)

            

            return savedUser  
        }
        catch(error){
            throw new InternalServerErrorException('Unable to register the user', {
                cause: new Error(),
                description: error.message,
            });
        }
    }
}
