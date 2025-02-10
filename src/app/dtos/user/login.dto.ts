import {
    IsNotEmpty,
    IsString,
    IsPhoneNumber,
} from 'class-validator';

export class LoginDTO {
    @IsPhoneNumber()
    @IsNotEmpty()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    role_id: number;

    constructor(data: any) {
        this.phone_number = data.phone_number;
        this.password = data.password;
        this.role_id = data.role_id; 
    }
}