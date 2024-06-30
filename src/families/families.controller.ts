import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddMemberDTO } from './dto/AddMemberDTO';

@Controller('families')
@UseGuards(AuthGuard)
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post("/members")
  @HttpCode(200)
  async addMember(@Req() req, @Body() bodyData: AddMemberDTO) {
    const { sub: userId } = req.user;
    const { email } = bodyData
    
    return await this.familiesService.addMember(userId, email);
  }
}
