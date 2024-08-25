import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './appointment.entity';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'appointments/slots', method: RequestMethod.GET },
        { path: 'appointments/book', method: RequestMethod.POST },
        { path: 'appointments/cancel', method: RequestMethod.DELETE },
      );
  }
}
