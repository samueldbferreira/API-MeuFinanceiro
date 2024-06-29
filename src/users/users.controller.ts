import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  async createUser(@Body() bodyData: CreateUserDTO) {
    return await this.usersService.createUser(bodyData);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getUser(@Request() req) {
    const { sub: userId } = req.user;

    return await this.usersService.findById(userId);
  }
}
