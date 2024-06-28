import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly JwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválida.');
    }

    const equalPasswords = await compare(password, user.password);
    if (!equalPasswords) {
      throw new UnauthorizedException('Email ou senha inválida.');
    }

    const payload = { sub: user.id, username: user.firstName };

    return {
      access_token: await this.JwtService.signAsync(payload),
    };
  }
}
