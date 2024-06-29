import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateObjectiveDTO } from './dto/CreateObjectiveDTO';
import { ObjectivesService } from './objectives.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('objectives')
@UseGuards(AuthGuard)
export class ObjectivesController {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @Post('')
  async createObjective(@Req() req, @Body() bodyData: CreateObjectiveDTO) {
    const { sub: userId } = req.user;

    return await this.objectivesService.createObjective(bodyData, userId);
  }
}
