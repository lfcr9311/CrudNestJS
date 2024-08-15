import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'The name is required'})
    @MinLength(3, {message: 'The name must have at least 1 character'})
    name: string;

    @IsEmail()
    email: string;

    @Length(11,11, {message: 'The cellphone must have 11 characters'})
    cellphone: string;

    @IsNotEmpty({message: 'The password is required'})
    @MinLength(6, {message: 'The password must have at least 6 characters'})
    password: string;
  }

  export default CreateUserDto;