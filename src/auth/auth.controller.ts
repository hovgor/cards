import { Body, Controller, HttpCode, HttpStatus, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthDto } from './dto/authDto';
import { RegisterDto } from './dto/registerDto';
const sha1: any = require('sha1');
const cron: any = require('node-cron');

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    @Post('login')
    async login(@Res() res: Response, @Body() body: AuthDto ){
        try {
            let verifayEmail = await this.userService.getUserByQuery({email: body.email.toLowerCase()});
           
            if(!verifayEmail){
                throw "user with this email does not exists" ;
            }

            if(sha1(body.password) !== verifayEmail.password){
                throw " email or password not found !!! \n pleas lets try agen ";
            }
            let accessToken = await this.authService.loginAndJwt(body.email.toLowerCase(),jwtConstants.expiresIn);
           
            cron.schedule(`*/2 * * * *`, ()=>{
            const newAccessToken =  this.authService.loginAndJwt(body.email.toLowerCase(),jwtConstants.expiresIn);
            console.log(newAccessToken)
            return newAccessToken;
            })
            let refreshToken = await this.authService.loginAndJwt(body.email.toLocaleLowerCase(),jwtConstants.expiresIn); 
            
            return res.status(HttpStatus.OK).json({
                "accessToken":accessToken,
                "refreshToken": refreshToken    
        });
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    @Post('register')
    async register(@Res() res: Response, @Body() body: RegisterDto ){
        try {
            
            const verifayEmail = await this.userService.getUserByQuery({email: body.email.toLowerCase()});
           
            if(verifayEmail){
                throw "user with this email already exists" ;
            }
           
            if(body.retPassword !== body.password){
                throw "Passwords do not match"
            }

            const newUser = await this.userService.createUser({
                firstName:body.firstName,
                lastName:body.lastName,
                email:body.email.toLowerCase(),
                password: sha1(body.password)
            });

           return res.status(HttpStatus.OK).json({
               success:true,
               new_user_name: body.firstName
           });

        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }




}

