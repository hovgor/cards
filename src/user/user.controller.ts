import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/userDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    // update user Data
    @Put('updateUser/:id')
    async updateUser(@Body() body: UserDto, @Param() id: string, @Res() res: Response ){
        try {
           const userId = await this.userService.getUser(id);
           if(!userId){
               throw 'User is not found';
           } 
           const newData = await this.userService.updateUserData(userId.id,{
            firstName:body.firstName,
            lastName:body.lastName,
            email:body.email,
            password:body.password
           });
        return res.status(HttpStatus.OK).json({
            success: true + " : update the user",
            id: userId
        });

        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // delete user
    @Delete('deleteUser/:id')
    async deleteUserById(@Res() res: Response, @Param() id: string){
        try {
            const userId = await this.userService.getUser(id);
            if(!userId){
                throw 'User is not found';
            } 
            await this.userService.deleteUser(id);
            return res.status(HttpStatus.OK).json({
                success: true + " : delete the user ",
                id: id
            })
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // get user by ID
    @Get('getOneUser/:id')
    async getOneUserById(@Res() res: Response, @Param() id: string){
        try {
            const userId = await this.userService.getUser(id);
            if(!userId){
                throw 'User is not found';
            } 
            const user = await this.userService.getUser(id);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // get all users
    @Get('getAllUsers')
    async getAllUsers(@Res()res:Response){
        try {
           const allUsers = await this.userService.getAllUsers();
           const result = [];
           for(const allUser of allUsers){
               result.push({
                   firstName:allUser.firstName,
                   lastName:allUser.lastName,
                   email:allUser.email,
                   createDate:allUser.createdDate
               })
           }

           return res.status(HttpStatus.OK).json(result);
           



        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

}
