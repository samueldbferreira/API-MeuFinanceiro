import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/SignInDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async signIn(@Body() { email, password }: SignInDTO) {
    return await this.authService.signIn(email, password);
  }
}
