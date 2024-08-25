import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
