import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private readonly 
    ){}
}