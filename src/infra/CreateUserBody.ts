import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserBody {
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(11, 11)
    cellPhone: string;

    @IsNotEmpty()
    @Length(6)
    password: string;
}