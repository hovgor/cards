import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

  // create user 
  async createUser(newUser: any){
    try {
        return await this.userRepository.save(this.userRepository.create(newUser))
    } catch (error) {
        Logger.log('error=>', error);
        throw error;
    }
}

// get user by id
async getUser(id: string){
    try {
        return await this.userRepository.findOne(id);
    } catch (error) {
        Logger.log('error=> ',error);
        throw error;
    }
}

// get all users
async getAllUsers(){
    try {
        return await this.userRepository.find();
    } catch (error) {
        Logger.log('error=> ',error);
        throw error;
    }
}

// delete user by id
async deleteUser(id: string){
    try {
        await this.userRepository.delete(id);
    } catch (error) {
        Logger.log('error=> ', error);
        throw error;
    }
}

// get by email 
async getUserByEmail(emailUser: string){
    try {
        const userEmail = await this.userRepository.findOne({email:emailUser})
        return userEmail;
    } catch (error) {
        Logger.log('error=> ', error);
        throw error;
    }
}

// update user data
async updateUserData(id: string, data: any){
    try {
         await this.userRepository.update({id:id},data);
        
    } catch (error) {
        Logger.log('error=> ', error);
        throw error;
    }
  }




}