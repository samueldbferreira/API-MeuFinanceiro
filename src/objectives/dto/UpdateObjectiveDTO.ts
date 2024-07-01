import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateObjectiveDTO {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  total: number;
}
