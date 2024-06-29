import { Controller, UseGuards } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('families')
@UseGuards(AuthGuard)
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}
}
