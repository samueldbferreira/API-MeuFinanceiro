import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  
  userId: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
