import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('slots')
  getAvailableSlots(@Query('date') date: string) {
    return this.appointmentsService.getAvailableSlots(date);
  }

  @Post('book')
  async bookAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.bookAppointment(
      createAppointmentDto.date,
      createAppointmentDto.time,
      createAppointmentDto.email,
    );
  }

  @Delete('cancel')
  async cancelAppointment(@Body() cancelAppointmentDto: CancelAppointmentDto) {
    return await this.appointmentsService.cancelAppointment(
      cancelAppointmentDto.date,
      cancelAppointmentDto.time,
      cancelAppointmentDto.email,
    );
  }
}
