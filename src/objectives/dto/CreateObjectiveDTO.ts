import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateObjectiveDTO {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  total: number;
}
