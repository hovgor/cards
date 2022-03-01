import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
       @InjectRepository(User)
    private userRepository: Repository<User> ,
       private jwtService: JwtService
    ){}


    // login 
    async loginAndJwt(email: string){
        try {
            const paylod = {email};
            return {
               accessToken: await this.jwtService.signAsync(paylod)
            }
        } catch (error) {
            Logger.log('error=> ',error);
            throw error;
        }

    }
    


}