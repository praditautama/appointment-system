import { IsNotEmpty, IsEmail } from 'class-validator';

export class CancelAppointmentDto {
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
