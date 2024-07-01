import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateObjectiveDTO } from './dto/CreateObjectiveDTO';
import { ObjectivesService } from './objectives.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateObjectiveDTO } from './dto/UpdateObjectiveDTO';

@Controller('objectives')
@UseGuards(AuthGuard)
export class ObjectivesController {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async createObjective(@Req() req, @Body() bodyData: CreateObjectiveDTO) {
    const { sub: userId } = req.user;

    return await this.objectivesService.createObjective(bodyData, userId);
  }

  @Get(':id')
  async getObjective(@Param('id') id: string) {
    return await this.objectivesService.getObjective(id);
  }

  @Get('')
  async getObjectives(@Req() req) {
    const { sub: userId } = req.user;

    return await this.objectivesService.getObjectives(userId);
  }

  @Delete(':id')
  async deleteObjective(@Param('id') id: string) {
    return await this.objectivesService.deleteObjective(id);
  }

  @Put(':id')
  async updateObjective(
    @Param('id') id: string,
    @Body() bodyData: UpdateObjectiveDTO,
  ) {
    return await this.objectivesService.updateObjective(id, bodyData);
  }
}
