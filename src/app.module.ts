import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'appointments.sqlite',
      entities: [Appointment],
      synchronize: true,
    }),
    AppointmentsModule,
  ],
})
export class AppModule {}
