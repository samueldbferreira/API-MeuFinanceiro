import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddMemberDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
