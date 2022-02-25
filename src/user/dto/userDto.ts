import { IsNotEmpty, IsString } from "class-validator";

export class UserDto{

    id: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    password:string;
    

}